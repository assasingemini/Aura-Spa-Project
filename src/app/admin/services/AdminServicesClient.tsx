"use client";

import { useState, useTransition, useRef } from "react";
import { Plus, Pencil, Trash2, Search, Clock, X, Save, Upload, Image as ImageIcon } from "lucide-react";
import { ImageWithFallback } from "@/app/components/figma/ImageWithFallback";
import { toast } from "sonner";
import { createServiceAction, updateServiceAction, deleteServiceAction } from "./actions";

const SERIF = { fontFamily: "'Playfair Display', serif" };

export interface ServiceUI {
  id: string;
  name: string;
  description: string;
  price: number;
  duration: number; // in min
  imageUrl: string;
  isActive: boolean;
}

export function AdminServicesClient({ initialServices }: { initialServices: ServiceUI[] }) {
  const [search, setSearch] = useState("");
  const [editingService, setEditingService] = useState<ServiceUI | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  
  const [isPending, startTransition] = useTransition();
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const filtered = initialServices.filter((s) =>
    s.name.toLowerCase().includes(search.toLowerCase())
  );

  const openNew = () => {
    setEditingService({
      id: "new",
      name: "",
      price: 0,
      duration: 60,
      imageUrl: "",
      description: "",
      isActive: true,
    });
    setShowModal(true);
  };

  const openEdit = (service: ServiceUI) => {
    setEditingService({ ...service });
    setShowModal(true);
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !editingService) return;

    setIsUploading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/upload", { method: "POST", body: formData });
      if (!res.ok) throw new Error("Upload failed");
      const data = await res.json();
      setEditingService({ ...editingService, imageUrl: data.url });
      toast.success("Image uploaded successfully!");
    } catch (error) {
      toast.error("Failed to upload image.");
    } finally {
      setIsUploading(false);
    }
  };

  const handleSave = () => {
    if (!editingService) return;
    
    // Basic validation
    if (!editingService.name.trim()) return toast.error("Name is required");
    if (editingService.price < 0) return toast.error("Price must be >= 0");
    if (editingService.duration <= 0) return toast.error("Duration must be > 0");

    startTransition(async () => {
      try {
        const payload = {
          name: editingService.name,
          description: editingService.description,
          price: editingService.price,
          duration: editingService.duration,
          imageUrl: editingService.imageUrl,
          isActive: editingService.isActive,
        };

        if (editingService.id === "new") {
          const res = await createServiceAction(payload);
          if (res.success) toast.success("Service created successfully");
        } else {
          const res = await updateServiceAction(editingService.id, payload);
          if (res.success) toast.success("Service updated successfully");
        }
        setShowModal(false);
        setEditingService(null);
      } catch (error) {
        toast.error("Failed to save service");
      }
    });
  };

  const handleDelete = (id: string) => {
    startTransition(async () => {
      const res = await deleteServiceAction(id);
      if (res.success) {
        toast.success("Service deleted");
        setDeleteConfirm(null);
      } else {
        toast.error(res.error || "Failed to delete service. It may have existing bookings.");
        setDeleteConfirm(null);
      }
    });
  };

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 style={SERIF} className="text-gray-900 text-2xl font-semibold">Manage Services</h1>
          <p className="text-gray-400 text-sm mt-1">{initialServices.length} treatments listed</p>
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
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
        {filtered.map((service) => (
          <div key={service.id} className="rounded-2xl bg-white border border-pink-100 overflow-hidden hover:border-pink-300/60 hover:shadow-lg hover:shadow-pink-100/40 transition-all">
            <div className="aspect-video relative overflow-hidden bg-gray-100">
              {service.imageUrl ? (
                <ImageWithFallback src={service.imageUrl} alt={service.name} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-300">
                  <ImageIcon className="w-12 h-12" />
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              <div className="absolute top-3 left-3 flex gap-2">
                <span className={`px-2.5 py-1 rounded-full text-xs border ${service.isActive ? "bg-green-500/90 text-white border-green-400" : "bg-gray-500/90 text-white border-gray-400"}`}>
                  {service.isActive ? "Active" : "Inactive"}
                </span>
              </div>
            </div>
            <div className="p-5">
              <h3 className="text-gray-900 font-semibold mb-1 truncate">{service.name}</h3>
              <p className="text-gray-400 text-sm mb-4 line-clamp-2 min-h-[40px]">{service.description}</p>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-1.5 text-gray-400 text-sm">
                  <Clock className="w-4 h-4 text-pink-300" /> {service.duration} min
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
        {filtered.length === 0 && (
          <div className="col-span-1 md:col-span-2 xl:col-span-3 py-16 text-center text-gray-400 border border-dashed border-pink-200 rounded-2xl">
            No services found matching your search.
          </div>
        )}
      </div>

      {/* Edit/Add Modal */}
      {showModal && editingService && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/20 backdrop-blur-md">
          <div className="w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl bg-white border border-pink-100 shadow-2xl shadow-pink-200/30">
            <div className="flex items-center justify-between p-6 border-b border-pink-100">
              <h2 style={SERIF} className="text-gray-900 text-xl font-semibold">
                {editingService.id === "new" ? "New Service" : "Edit Service"}
              </h2>
              <button 
                onClick={() => setShowModal(false)} 
                disabled={isPending || isUploading}
                className="p-2 rounded-lg hover:bg-pink-50 text-gray-400 hover:text-pink-600 transition-all disabled:opacity-50"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-5">
              <div className="grid grid-cols-2 gap-5">
                <div className="col-span-2 sm:col-span-1">
                  <label className="text-gray-500 text-sm mb-1.5 block">Service Name</label>
                  <input
                    value={editingService.name}
                    onChange={(e) => setEditingService({ ...editingService, name: e.target.value })}
                    className="w-full bg-pink-50/40 border border-pink-200/60 rounded-xl px-4 py-3 text-gray-800 text-sm focus:outline-none focus:border-pink-400 focus:bg-white transition-colors"
                    placeholder="E.g. Signature Facial"
                  />
                </div>
                {/* Image Upload Row */}
                <div className="col-span-2 sm:col-span-1">
                  <label className="text-gray-500 text-sm mb-1.5 block">Image</label>
                  <div className="flex gap-2">
                    <input
                      type="file"
                      ref={fileInputRef}
                      className="hidden"
                      accept="image/*"
                      onChange={handleFileUpload}
                    />
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      disabled={isUploading}
                      className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl border border-pink-200 text-gray-600 text-sm hover:border-pink-300 hover:bg-pink-50 transition-all ${isUploading ? "opacity-50" : ""}`}
                    >
                      <Upload className="w-4 h-4" /> {isUploading ? "Uploading..." : "Upload Photo"}
                    </button>
                  </div>
                  {editingService.imageUrl && (
                    <div className="mt-2 text-xs text-green-600 flex items-center gap-1">
                       ✓ Image uploaded
                    </div>
                  )}
                </div>

                <div>
                  <label className="text-gray-500 text-sm mb-1.5 block">Duration (minutes)</label>
                  <input
                    type="number"
                    value={editingService.duration}
                    onChange={(e) => setEditingService({ ...editingService, duration: Number(e.target.value) })}
                    className="w-full bg-pink-50/40 border border-pink-200/60 rounded-xl px-4 py-3 text-gray-800 text-sm focus:outline-none focus:border-pink-400 focus:bg-white transition-colors"
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
                <div className="col-span-2 flex items-center gap-3">
                  <input
                    type="checkbox"
                    id="isActive"
                    checked={editingService.isActive}
                    onChange={(e) => setEditingService({ ...editingService, isActive: e.target.checked })}
                    className="w-4 h-4 rounded accent-pink-500"
                  />
                  <label htmlFor="isActive" className="text-gray-500 text-sm">Visible to customers</label>
                </div>
                
                <div className="col-span-2">
                  <label className="text-gray-500 text-sm mb-1.5 block">Description</label>
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
                  disabled={isPending || isUploading}
                  className="flex-1 py-3 rounded-xl border border-pink-200 text-gray-500 hover:text-pink-600 hover:border-pink-300 hover:bg-pink-50 text-sm transition-all disabled:opacity-50"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  disabled={isPending || isUploading}
                  className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-[#EC4899] to-[#A855F7] text-white text-sm font-medium hover:opacity-90 transition-opacity disabled:opacity-50"
                >
                  <Save className="w-4 h-4" /> {isPending ? "Saving..." : "Save Service"}
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
              <button 
                onClick={() => setDeleteConfirm(null)} 
                disabled={isPending}
                className="flex-1 py-3 rounded-xl border border-pink-200 text-gray-500 hover:text-pink-600 hover:border-pink-300 text-sm transition-all disabled:opacity-50"
              >
                Cancel
              </button>
              <button 
                onClick={() => handleDelete(deleteConfirm)} 
                disabled={isPending}
                className="flex-1 py-3 rounded-xl bg-red-500 text-white text-sm font-medium hover:bg-red-600 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {isPending ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
