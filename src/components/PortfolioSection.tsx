import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { collection, onSnapshot, query, addDoc, updateDoc, orderBy, deleteDoc, doc, serverTimestamp } from 'firebase/firestore';
import { db, auth } from '../lib/firebase';
import { signInWithPopup, GoogleAuthProvider, onAuthStateChanged, signOut } from 'firebase/auth';
import { Plus, X, Trash2, LogIn, LogOut, Loader2 } from 'lucide-react';

interface Project {
  id: string;
  title: string;
  category: string;
  imageUrl: string; 
  images: string[];
  description: string;
  order: number;
  createdAt?: any;
}

const ADMIN_EMAIL = 'msg.designstudio.sg@gmail.com';

export default function PortfolioSection() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [loading, setLoading] = useState(true);
  
  // Form State
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState('Packaging');
  const [newDescription, setNewDescription] = useState('');
  const [newImages, setNewImages] = useState<string[]>([]);
  const [newThumbnail, setNewThumbnail] = useState<string | null>(null);
  const [newOrder, setNewOrder] = useState<number>(0);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  useEffect(() => {
    const q = query(collection(db, 'projects'), orderBy('order', 'asc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const docs = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Project));
      setProjects(docs);
      setLoading(false);
    }, (error) => {
      console.error("Firestore onSnapshot error:", error);
      setLoading(false);
    });

    const unsubscribeAuth = onAuthStateChanged(auth, (u) => {
      console.log("Auth state updated:", u ? u.email : "No user", "Verified:", u?.emailVerified);
      setUser(u);
      
      const isEmailMatch = u?.email?.toLowerCase().trim() === ADMIN_EMAIL.toLowerCase().trim();
      const isVerified = u?.emailVerified === true;
      const isUserAdmin = isEmailMatch && isVerified;
      
      console.log("Admin Status Check:", { isEmailMatch, isVerified, isUserAdmin });
      setIsAdmin(isUserAdmin);
      
      if (u && isEmailMatch && !isVerified) {
        console.warn('Admin email detected but not verified. Access restricted.');
      }
    });

    const handleAdminTrigger = () => {
      if (!user) {
        handleLogin();
      }
    };
    window.addEventListener('trigger-admin-login', handleAdminTrigger);

    return () => {
      unsubscribe();
      unsubscribeAuth();
      window.removeEventListener('trigger-admin-login', handleAdminTrigger);
    };
  }, [user]);

  useEffect(() => {
    const event = new CustomEvent('hide-navbar', { detail: { hidden: !!selectedProject } });
    window.dispatchEvent(event);
  }, [selectedProject]);

  const handleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
    } catch (err) {
      console.error(err);
    }
  };

  const handleLogout = () => signOut(auth);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    if (newImages.length + files.length > 10) {
      alert('You can only upload up to 10 images per project.');
      return;
    }

    Array.from(files).forEach((file: File) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          const MAX_WIDTH = 1920; 
          const MAX_HEIGHT = 1920;
          let width = img.width;
          let height = img.height;

          if (width > MAX_WIDTH || height > MAX_HEIGHT) {
            const ratio = Math.min(MAX_WIDTH / width, MAX_HEIGHT / height);
            width *= ratio;
            height *= ratio;
          }

          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          if (ctx) {
            ctx.imageSmoothingEnabled = true;
            ctx.imageSmoothingQuality = 'high';
            ctx.drawImage(img, 0, 0, width, height);
          }
          
          const dataUrl = canvas.toDataURL('image/webp', 0.82); 
          setNewImages(prev => [...prev, dataUrl]);
        };
        img.src = reader.result as string;
      };
      reader.readAsDataURL(file);
    });
  };

  const handleThumbnailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        // Thumbnails can be smaller (800px) to save document space for gallery images
        const MAX_DIM = 1920; 
        let width = img.width;
        let height = img.height;

        if (width > MAX_DIM || height > MAX_DIM) {
          const ratio = Math.min(MAX_DIM / width, MAX_DIM / height);
          width *= ratio;
          height *= ratio;
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.imageSmoothingEnabled = true;
          ctx.imageSmoothingQuality = 'high';
          ctx.drawImage(img, 0, 0, width, height);
        }
        
        const dataUrl = canvas.toDataURL('image/webp', 0.85);
        setNewThumbnail(dataUrl);
      };
      img.src = reader.result as string;
    };
    reader.readAsDataURL(file);
  };

  const removeImage = (index: number) => {
    setNewImages(prev => prev.filter((_, i) => i !== index));
  };

  const handleFirestoreError = (error: any, operationType: string, path: string | null) => {
    const errInfo = {
      error: error instanceof Error ? error.message : String(error),
      operationType,
      path,
      authInfo: {
        userId: auth.currentUser?.uid,
        email: auth.currentUser?.email,
        emailVerified: auth.currentUser?.emailVerified,
      }
    };
    console.error('Firestore Error: ', JSON.stringify(errInfo));
    throw new Error(JSON.stringify(errInfo));
  };

  const openAddModal = () => {
    setEditingId(null);
    setNewTitle('');
    setNewCategory('Packaging');
    setNewDescription('');
    setNewImages([]);
    setNewThumbnail(null);
    setNewOrder(projects.length > 0 ? Math.max(...projects.map(p => p.order || 0)) + 1 : 0);
    setShowAddModal(true);
  };

  const openEditModal = (project: Project) => {
    setEditingId(project.id);
    setNewTitle(project.title);
    setNewCategory(project.category);
    setNewDescription(project.description || '');
    setNewImages(project.images || [project.imageUrl]);
    setNewThumbnail(project.imageUrl);
    setNewOrder(project.order || 0);
    setShowAddModal(true);
  };

  const [saveError, setSaveError] = useState<string | null>(null);

  const handleSaveProject = async () => {
    console.log('--- Handle Save Project Started ---');
    setSaveError(null);
    if (isUploading) {
      console.log('Already uploading, skipping...');
      return;
    }
    
    // Final validation
    if (!newTitle.trim()) {
      alert('Project title is required.');
      return;
    }
    
    let finalThumbnail = newThumbnail || (newImages.length > 0 ? newImages[0] : null);
    if (!finalThumbnail) {
      alert('Please provide at least one image or a thumbnail.');
      return;
    }

    setIsUploading(true);
    console.log('isUploading set to true');

    try {
      let finalImages = newImages.length > 0 ? newImages : [finalThumbnail];
      console.log('Preparing data for Firestore. Gallery count:', finalImages.length);

      const getPayloadSize = (thumb: string, imgs: string[]) => {
        const dataSize = (thumb?.length || 0) + imgs.reduce((acc, img) => acc + (img?.length || 0), 0);
        return dataSize + newTitle.length + (newDescription?.length || 0) + 40000;
      };

      let totalEstimatedSize = getPayloadSize(finalThumbnail, finalImages);
      console.log(`Estimated upload size: ${Math.round(totalEstimatedSize/1024)}KB`);

      if (totalEstimatedSize > 10 * 1024 * 1024)
        console.error('Payload size exceeds 10MB limit');
        alert(`용량이 너무 큽니다 (${Math.round(totalEstimatedSize/1024)}KB / 10240KB 제한)`);
        setIsUploading(false);
        return;
      }

      const existingProject = editingId ? projects.find(p => p.id === editingId) : null;
      
      const projectData: any = {
        title: newTitle.trim(),
        category: newCategory,
        description: newDescription.trim(), 
        imageUrl: finalThumbnail, 
        images: finalImages,
        order: Number(newOrder) || 0,
      };

      if (editingId) {
        projectData.updatedAt = serverTimestamp();
        projectData.createdAt = existingProject?.createdAt || serverTimestamp();
      } else {
        projectData.createdAt = serverTimestamp();
      }

      console.log('Sending data to Firestore...', editingId ? 'Update' : 'Create');

      if (editingId) {
        const docRef = doc(db, 'projects', editingId);
        await updateDoc(docRef, projectData);
      } else {
        const colRef = collection(db, 'projects');
        await addDoc(colRef, projectData);
      }

      console.log('Firestore operation success!');
      
      // Cleanup
      setShowAddModal(false);
      setEditingId(null);
      setNewTitle('');
      setNewCategory('Packaging');
      setNewDescription('');
      setNewImages([]);
      setNewThumbnail(null);
      
      alert('성공적으로 저장되었습니다!');
    } catch (err: any) {
      console.error('CRITICAL SAVE ERROR DETECTED:', err);
      
      let errorMessage = '저장 중 오류가 발생했습니다.';
      if (err.code === 'permission-denied') {
        errorMessage = '권한이 없습니다: 관리자 로그인이 필요합니다.';
      } else if (err.message?.includes('too large') || err.message?.includes('1,048,576')) {
        errorMessage = '데이터 용량이 1MB를 초과했습니다. 이미지 개수를 줄이거나 해상도를 낮춰주세요.';
      } else {
        errorMessage = `저장 실패: ${err.message || '알 수 없는 오류'}`;
      }
      
      setSaveError(errorMessage);
      alert(errorMessage);
    } finally {
      setIsUploading(false);
      console.log('isUploading reset to false');
      console.log('--- Handle Save Project Finished ---');
    }
  };

  const handleDelete = async (id: string) => {
    console.log('--- Handle Delete Start ---');
    console.log('Project ID to delete:', id);
    if (window.confirm('정말로 삭제하시겠습니까?')) {
      try {
        console.log('Attempting deleteDoc...');
        await deleteDoc(doc(db, 'projects', id));
        console.log('deleteDoc successful');
        alert('삭제되었습니다.');
      } catch (err: any) {
        console.error('Delete error details:', err);
        if (err.code === 'permission-denied') {
          alert('권한이 없습니다: 관리자 권한이 필요합니다. (Permission Denied)');
        } else {
          alert(`삭제 중 오류가 발생했습니다: ${err.message || '알 수 없는 오류'}`);
        }
      }
    }
    console.log('--- Handle Delete Finished ---');
  };

  return (
    <section id="work" className="relative py-20 md:py-32 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 md:mb-24 gap-8">
          <div>
            <h2 className="text-sm font-mono uppercase tracking-[0.3em] text-zinc-500 mb-6">Our Work</h2>
            <h3 className="text-5xl md:text-7xl font-light">
               Selected <span className="italic font-serif">Creations</span>
            </h3>
          </div>
          
          <div className="flex gap-4 items-center">
             {user && (
               <div className="flex flex-col items-end mr-4">
                 <span className="text-[10px] font-mono text-zinc-500 uppercase">Logged in as</span>
                 <span className={`text-xs font-mono ${isAdmin ? 'text-[#ccff00]' : 'text-zinc-400'}`}>
                   {user.email} {!isAdmin && user.email?.toLowerCase().trim() === ADMIN_EMAIL.toLowerCase().trim() ? '(Not Verified)' : ''}
                 </span>
               </div>
             )}
             {isAdmin ? (
               <>
                <button 
                  onClick={openAddModal}
                  className="glass px-6 py-3 rounded-full flex items-center gap-2 text-sm hover:bg-white/10 transition-all font-medium bg-white/5 border border-white/10"
                >
                  <Plus className="w-4 h-4" /> Add Work
                </button>
                <button onClick={handleLogout} className="text-zinc-500 hover:text-white transition-colors p-2" title="Logout"><LogOut className="w-5 h-5"/></button>
               </>
             ) : (
               <button 
                onClick={() => {
                  console.log("Login button clicked");
                  handleLogin();
                }} 
                className="text-zinc-600 hover:text-[#ccff00] transition-colors p-2 flex items-center gap-2 text-xs font-mono"
               >
                 <LogIn className="w-4 h-4"/> Admin
               </button>
             )}
          </div>
        </div>

        {loading ? (
          <div className="h-64 flex items-center justify-center">
            <Loader2 className="w-8 h-8 animate-spin text-zinc-500" />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {projects.map((project, idx) => (
              <motion.div 
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: (idx % 3) * 0.1 }}
                className="group relative cursor-pointer"
                onClick={() => setSelectedProject(project)}
              >
                <div className="aspect-[4/5] bg-white/5 rounded-[1.5rem] md:rounded-[2.5rem] overflow-hidden mb-4 md:mb-6 relative border border-white/5">
                  <img src={project.imageUrl} alt={project.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-8 gap-4 backdrop-blur-[2px]">
                     <span className="text-xs font-mono uppercase tracking-widest text-[#ccff00]">{project.category}</span>
                     <h4 className="text-2xl font-medium">{project.title}</h4>
                      {isAdmin && (
                        <div className="absolute top-6 right-6 flex gap-3 z-[60]">
                          <button 
                            onClick={(e) => { e.stopPropagation(); openEditModal(project); }}
                            className="p-3 bg-white/10 backdrop-blur-md text-white rounded-full hover:bg-[#ccff00] hover:text-black transition-all border border-white/10"
                            title="Edit Project"
                          >
                            <Plus className="w-4 h-4 rotate-45" />
                          </button>
                          <button 
                           onClick={(e) => { 
                             console.log('Trash icon clicked for project:', project.id);
                             e.stopPropagation(); 
                             handleDelete(project.id); 
                           }}
                           className="p-3 bg-red-500/20 backdrop-blur-md text-red-500 rounded-full hover:bg-red-500 hover:text-white transition-all border border-red-500/20"
                           title="Delete Project"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Add Modal */}
      <AnimatePresence>
        {showAddModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 pb-20">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowAddModal(false)}
              className="absolute inset-0 bg-black/80 backdrop-blur-md"
            />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative w-full max-w-2xl glass-panel p-10 rounded-[3rem] shadow-2xl overflow-y-auto max-h-[85vh]"
            >
              <button 
                onClick={() => setShowAddModal(false)}
                className="absolute top-6 right-6 text-zinc-500 hover:text-white"
              >
                <X className="w-6 h-6" />
              </button>
              
              <h3 className="text-3xl font-light mb-8">{editingId ? 'Edit Portfolio Piece' : 'Add Portfolio Piece'}</h3>
              
              <div className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-mono uppercase tracking-widest text-zinc-500 mb-2">Project Title</label>
                    <input 
                      value={newTitle}
                      onChange={e => setNewTitle(e.target.value)}
                      className="w-full bg-white/5 border border-white/10 p-4 rounded-2xl outline-none focus:border-[#ccff00] transition-colors"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-xs font-mono uppercase tracking-widest text-zinc-500 mb-2">Category</label>
                    <select 
                      value={newCategory}
                      onChange={e => setNewCategory(e.target.value)}
                      className="w-full bg-white/5 border border-white/10 p-4 rounded-2xl outline-none focus:border-[#ccff00] transition-colors appearance-none"
                    >
                      <option value="Branding">Branding</option>
                      <option value="Packaging">Packaging</option>
                      <option value="VisualIdentity">Visual Identity</option>
                      <option value="Digital">Digital Design</option>
                    </select>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-mono uppercase tracking-widest text-zinc-500 mb-2">Display Order (Smaller first)</label>
                    <input 
                      type="number"
                      value={newOrder}
                      onChange={e => setNewOrder(parseInt(e.target.value) || 0)}
                      className="w-full bg-white/5 border border-white/10 p-4 rounded-2xl outline-none focus:border-[#ccff00] transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase tracking-widest text-zinc-500 mb-2">Detailed Description</label>
                  <textarea 
                    value={newDescription}
                    onChange={e => setNewDescription(e.target.value)}
                    rows={4}
                    className="w-full bg-white/5 border border-white/10 p-4 rounded-2xl outline-none focus:border-[#ccff00] transition-colors resize-none"
                    placeholder="Describe the project goals, process, and results..."
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase tracking-widest text-zinc-500 mb-2">Main Thumbnail (Representative)</label>
                  <div className="flex gap-4 items-center mb-6">
                    {newThumbnail ? (
                      <div className="relative w-32 aspect-square rounded-2xl overflow-hidden border border-[#ccff00]/30 shadow-lg shadow-[#ccff00]/10">
                        <img src={newThumbnail} className="w-full h-full object-cover" />
                        <button 
                          onClick={() => setNewThumbnail(null)}
                          className="absolute top-2 right-2 bg-black/60 p-1.5 rounded-full text-white hover:bg-[#ccff00] hover:text-black transition-all"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </div>
                    ) : (
                      <div className="relative w-32 aspect-square border-2 border-dashed border-white/10 rounded-2xl flex flex-col items-center justify-center hover:border-[#ccff00] transition-all cursor-pointer group bg-white/5">
                        <input 
                          type="file" 
                          accept="image/*"
                          onChange={handleThumbnailChange}
                          className="absolute inset-0 opacity-0 cursor-pointer"
                        />
                        <Plus className="w-6 h-6 text-zinc-600 group-hover:text-[#ccff00] mb-2" />
                        <span className="text-[8px] uppercase tracking-tighter text-zinc-500 group-hover:text-[#ccff00]">Upload Main</span>
                      </div>
                    )}
                    <div className="text-[10px] text-zinc-500 max-w-[200px] leading-relaxed">
                      이 이미지는 포트폴리오 리스트에 보여지는 <span className="text-[#ccff00]">메인 이미지</span>가 됩니다.
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase tracking-widest text-zinc-500 mb-2">Gallery Images (Max 10)</label>
                  <div className="grid grid-cols-5 gap-3 mb-4">
                    {newImages.map((img, i) => (
                      <div key={i} className="relative aspect-square rounded-lg overflow-hidden border border-white/10">
                        <img src={img} className="w-full h-full object-cover" />
                        <button 
                          onClick={() => removeImage(i)}
                          className="absolute top-1 right-1 bg-black/50 p-1 rounded-full text-white hover:bg-black"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </div>
                    ))}
                    {newImages.length < 10 && (
                      <div className="relative aspect-square border-2 border-dashed border-white/10 rounded-lg flex items-center justify-center hover:border-[#ccff00] transition-colors cursor-pointer group">
                        <input 
                          type="file" 
                          multiple
                          accept="image/*"
                          onChange={handleFileChange}
                          className="absolute inset-0 opacity-0 cursor-pointer"
                        />
                        <Plus className="w-4 h-4 text-zinc-600 group-hover:text-[#ccff00]" />
                      </div>
                    )}
                  </div>
                </div>

                {saveError && (
                  <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-2xl text-red-400 text-sm">
                    {saveError}
                  </div>
                )}

                <button 
                  disabled={isUploading}
                  onClick={handleSaveProject}
                  className="w-full py-4 bg-white text-black font-bold uppercase tracking-widest rounded-full hover:bg-[#ccff00] hover:text-black transition-all disabled:opacity-50"
                >
                  {isUploading ? 'Saving...' : (editingId ? 'Update Creation' : 'Save Creation')}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Project Detail Modal */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-[120] bg-black/98 backdrop-blur-3xl overflow-y-auto overflow-x-hidden">
             <motion.div 
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               exit={{ opacity: 0, y: 20 }}
               className="relative w-full max-w-7xl mx-auto py-12 md:py-32 px-4 sm:px-8"
             >
                <div className="fixed top-4 right-4 md:top-8 md:right-8 z-[150] flex gap-4">
                  <button 
                    onClick={() => setSelectedProject(null)}
                    className="p-3 md:p-4 bg-white/10 backdrop-blur-xl rounded-full text-white hover:bg-[#ccff00] hover:text-black transition-all shadow-2xl border border-white/10 active:scale-90"
                  >
                    <X className="w-6 h-6 md:w-8 md:h-8" />
                  </button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-[1fr,400px] gap-12 md:gap-16 lg:gap-32">
                   <div className="space-y-6 md:space-y-16">
                      {selectedProject.images && selectedProject.images.map((img, i) => (
                        <motion.div 
                          key={i}
                          initial={{ opacity: 0, scale: 0.98 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          viewport={{ once: true, margin: "-100px" }}
                          className="rounded-[1rem] overflow-hidden border border-white/5 bg-white/5 shadow-2xl"
                        >
                          <img src={img} alt={`${selectedProject.title} ${i + 1}`} className="w-full h-auto block" />
                        </motion.div>
                      ))}
                      {(!selectedProject.images || selectedProject.images.length === 0) && (
                        <div className="rounded-[1rem] overflow-hidden border border-white/5 bg-white/5 shadow-2xl">
                          <img src={selectedProject.imageUrl} alt={selectedProject.title} className="w-full h-auto block" />
                        </div>
                      )}
                   </div>

                   <aside className="lg:sticky lg:top-24 h-fit space-y-10 md:space-y-16 lg:pt-0 pb-12">
                      <div className="space-y-4 md:space-y-6">
                        <span className="text-[10px] md:text-xs font-mono text-[#ccff00] uppercase tracking-[0.4em]">{selectedProject.category}</span>
                        <h2 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tighter uppercase leading-[0.9]">{selectedProject.title}</h2>
                      </div>
                      
                      <div className="h-[1px] bg-gradient-to-r from-white/20 to-transparent w-full" />

                      <div className="space-y-6 md:space-y-8">
                        <h5 className="text-[10px] md:text-[11px] font-mono text-zinc-500 uppercase tracking-[0.3em] md:tracking-[0.4em]">Project Insight</h5>
                        <p className="text-zinc-300 text-sm sm:text-base md:text-lg font-light leading-relaxed whitespace-pre-wrap">
                          {selectedProject.description || "No detailed description available."}
                        </p>
                      </div>

                      <div className="pt-8 md:pt-12">
                        <a 
                          href="http://pf.kakao.com/_CybjX/chat"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-full text-center inline-block px-8 md:px-12 py-4 md:py-6 bg-white text-black text-[10px] md:text-xs font-bold uppercase tracking-[0.3em] md:tracking-[0.4em] rounded-full hover:bg-[#ccff00] transition-all shadow-2xl active:scale-95"
                        >
                          Work With Us
                        </a>
                      </div>
                   </aside>
                </div>
             </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
