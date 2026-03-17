import { useEffect, useState } from "react";
import { Plus, Pencil, Trash2, Search, Clock, X, Save, Loader2 } from "lucide-react";
import { Service } from "../../data/mockData";
import { ImageWithFallback } from "../../components/figma/ImageWithFallback";
import { toast } from "sonner";

const SERIF = { fontFamily: "'Playfair Display', serif" };

export function AdminServices() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/services");
      const data = await res.json();
      // Map Prisma model to UI Service type
      const mapped = data.map((s: any) => ({
        id: s.id,
        title: s.name,
        description: s.description,
        price: s.price,
        duration: `${s.duration} min`,
        image: s.imageUrl || "",
        category: "General", // Placeholder
        featured: false,
        shortDescription: s.description.slice(0, 100) + "...",
      }));
      setServices(mapped);
    } catch (error) {
      toast.error("Failed to load services");
    } finally {
      setLoading(false);
    }
  };

  const filtered = services.filter((s) =>
    s.title.toLowerCase().includes(search.toLowerCase()) ||
    s.category.toLowerCase().includes(search.toLowerCase())
  );

  const openNew = () => {
    setEditingService({
      id: "",
      slug: "",
      title: "",
      category: "Facial Treatments",
      price: 0,
      duration: "60 min",
      image: "",
      shortDescription: "",
      description: "",
      benefits: [],
      featured: false,
    });
    setShowModal(true);
  };

  const openEdit = (service: Service) => {
    setEditingService({ ...service });
    setShowModal(true);
  };

  const handleSave = async () => {
    if (!editingService) return;
    
    try {
      const isNew = !editingService.id;
      const method = isNew ? "POST" : "PUT";
      const res = await fetch("/api/services", {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editingService),
      });

      if (!res.ok) throw new Error("Failed to save");

      toast.success(isNew ? "Service created" : "Service updated");
      fetchServices();
      setShowModal(false);
      setEditingService(null);
    } catch (error) {
      toast.error("Error saving service");
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(`/api/services?id=${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Delete failed");
      
      toast.success("Service deleted");
      fetchServices();
      setDeleteConfirm(null);
    } catch (error) {
      toast.error("Error deleting service");
    }
  };

  const CATEGORIES = ["Facial Treatments", "Massage Therapy", "Body Treatments", "Holistic Wellness", "Hand & Nail", "Water Therapy"];

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 style={SERIF} className="text-gray-900 text-2xl font-semibold">Manage Services</h1>
          <p className="text-gray-400 text-sm mt-1">{services.length} treatments available</p>
        </div>
        <button
          onClick={openNew}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#EC4899] to-[#A855F7] text-white text-sm font-medium hover:opacity-90 hover:shadow-lg hover:shadow-pink-300/30 transition-all"
        >
          <Plus className="w-4 h-4" /> Add Service
        </button>
      </div>

      {/* Search */}
      <div className="relative mb-6 max-w-sm">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-pink-300" />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search services..."
          className="w-full bg-pink-50/40 border border-pink-200/60 rounded-xl pl-11 pr-4 py-2.5 text-gray-700 text-sm placeholder-gray-400 focus:outline-none focus:border-pink-400 focus:bg-white transition-colors"
        />
      </div>

      {/* Services Grid */}
      {loading ? (
        <div className="flex items-center justify-center py-24">
          <Loader2 className="w-8 h-8 text-pink-500 animate-spin" />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
        {filtered.map((service) => (
          <div key={service.id} className="rounded-2xl bg-white border border-pink-100 overflow-hidden hover:border-pink-300/60 hover:shadow-lg hover:shadow-pink-100/40 transition-all">
            <div className="aspect-video relative overflow-hidden">
              <ImageWithFallback src={service.image} alt={service.title} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
              <div className="absolute top-3 left-3 flex gap-2">
                <span className="px-2.5 py-1 rounded-full bg-white/90 border border-pink-100 text-pink-600 text-xs">{service.category}</span>
                {service.featured && (
                  <span className="px-2.5 py-1 rounded-full bg-gradient-to-r from-[#EC4899] to-[#A855F7] text-white text-xs">✨ Featured</span>
                )}
              </div>
            </div>
            <div className="p-5">
              <h3 className="text-gray-900 font-semibold mb-1">{service.title}</h3>
              <p className="text-gray-400 text-sm mb-4 line-clamp-2">{service.shortDescription}</p>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-1.5 text-gray-400 text-sm">
                  <Clock className="w-4 h-4 text-pink-300" /> {service.duration}
                </div>
                <span className="text-gray-900 font-semibold">${service.price}</span>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => openEdit(service)}
                  className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg bg-pink-50 border border-pink-200/60 text-pink-600 hover:text-pink-700 hover:border-pink-300 hover:bg-pink-100 text-sm transition-all"
                >
                  <Pencil className="w-3.5 h-3.5" /> Edit
                </button>
                <button
                  onClick={() => setDeleteConfirm(service.id)}
                  className="flex items-center justify-center gap-1.5 px-4 py-2 rounded-lg bg-red-50 border border-red-200 text-red-500 hover:bg-red-100 text-sm transition-all"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      )}

      {/* Edit/Add Modal */}
      {showModal && editingService && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/20 backdrop-blur-md">
          <div className="w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl bg-white border border-pink-100 shadow-2xl shadow-pink-200/30">
            <div className="flex items-center justify-between p-6 border-b border-pink-100">
              <h2 style={SERIF} className="text-gray-900 text-xl font-semibold">
                {services.find((s) => s.id === editingService.id) ? "Edit Service" : "New Service"}
              </h2>
              <button onClick={() => setShowModal(false)} className="p-2 rounded-lg hover:bg-pink-50 text-gray-400 hover:text-pink-600 transition-all">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-5">
              <div className="grid grid-cols-2 gap-5">
                <div className="col-span-2">
                  <label className="text-gray-500 text-sm mb-1.5 block">Service Title</label>
                  <input
                    value={editingService.title}
                    onChange={(e) => setEditingService({ ...editingService, title: e.target.value })}
                    className="w-full bg-pink-50/40 border border-pink-200/60 rounded-xl px-4 py-3 text-gray-800 text-sm focus:outline-none focus:border-pink-400 focus:bg-white transition-colors"
                    placeholder="Service title"
                  />
                </div>
                <div>
                  <label className="text-gray-500 text-sm mb-1.5 block">Category</label>
                  <select
                    value={editingService.category}
                    onChange={(e) => setEditingService({ ...editingService, category: e.target.value })}
                    className="w-full bg-pink-50/40 border border-pink-200/60 rounded-xl px-4 py-3 text-gray-800 text-sm focus:outline-none focus:border-pink-400 focus:bg-white transition-colors"
                  >
                    {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-gray-500 text-sm mb-1.5 block">Duration</label>
                  <input
                    value={editingService.duration}
                    onChange={(e) => setEditingService({ ...editingService, duration: e.target.value })}
                    className="w-full bg-pink-50/40 border border-pink-200/60 rounded-xl px-4 py-3 text-gray-800 text-sm focus:outline-none focus:border-pink-400 focus:bg-white transition-colors"
                    placeholder="e.g. 90 min"
                  />
                </div>
                <div>
                  <label className="text-gray-500 text-sm mb-1.5 block">Price ($)</label>
                  <input
                    type="number"
                    value={editingService.price}
                    onChange={(e) => setEditingService({ ...editingService, price: Number(e.target.value) })}
                    className="w-full bg-pink-50/40 border border-pink-200/60 rounded-xl px-4 py-3 text-gray-800 text-sm focus:outline-none focus:border-pink-400 focus:bg-white transition-colors"
                  />
                </div>
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    id="featured"
                    checked={editingService.featured}
                    onChange={(e) => setEditingService({ ...editingService, featured: e.target.checked })}
                    className="w-4 h-4 rounded accent-pink-500"
                  />
                  <label htmlFor="featured" className="text-gray-500 text-sm">Featured treatment</label>
                </div>
                <div className="col-span-2">
                  <label className="text-gray-500 text-sm mb-1.5 block">Short Description</label>
                  <input
                    value={editingService.shortDescription}
                    onChange={(e) => setEditingService({ ...editingService, shortDescription: e.target.value })}
                    className="w-full bg-pink-50/40 border border-pink-200/60 rounded-xl px-4 py-3 text-gray-800 text-sm focus:outline-none focus:border-pink-400 focus:bg-white transition-colors"
                    placeholder="Brief one-liner description"
                  />
                </div>
                <div className="col-span-2">
                  <label className="text-gray-500 text-sm mb-1.5 block">Full Description</label>
                  <textarea
                    value={editingService.description}
                    onChange={(e) => setEditingService({ ...editingService, description: e.target.value })}
                    rows={4}
                    className="w-full bg-pink-50/40 border border-pink-200/60 rounded-xl px-4 py-3 text-gray-800 text-sm focus:outline-none focus:border-pink-400 focus:bg-white transition-colors resize-none"
                    placeholder="Detailed description..."
                  />
                </div>
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  onClick={() => setShowModal(false)}
                  className="flex-1 py-3 rounded-xl border border-pink-200 text-gray-500 hover:text-pink-600 hover:border-pink-300 hover:bg-pink-50 text-sm transition-all"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-[#EC4899] to-[#A855F7] text-white text-sm font-medium hover:opacity-90 transition-opacity"
                >
                  <Save className="w-4 h-4" /> Save Service
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirm */}
      {deleteConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/20 backdrop-blur-md">
          <div className="w-full max-w-sm rounded-2xl bg-white border border-pink-100 p-8 text-center shadow-2xl shadow-pink-200/30">
            <div className="w-14 h-14 rounded-full bg-red-50 border border-red-200 flex items-center justify-center mx-auto mb-4">
              <Trash2 className="w-6 h-6 text-red-500" />
            </div>
            <h3 style={SERIF} className="text-gray-900 text-xl font-semibold mb-2">Delete Service?</h3>
            <p className="text-gray-400 text-sm mb-6">This action cannot be undone. All associated data will be permanently removed.</p>
            <div className="flex gap-3">
              <button onClick={() => setDeleteConfirm(null)} className="flex-1 py-3 rounded-xl border border-pink-200 text-gray-500 hover:text-pink-600 hover:border-pink-300 text-sm transition-all">
                Cancel
              </button>
              <button onClick={() => handleDelete(deleteConfirm)} className="flex-1 py-3 rounded-xl bg-red-500 text-white text-sm font-medium hover:bg-red-600 transition-all">
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
