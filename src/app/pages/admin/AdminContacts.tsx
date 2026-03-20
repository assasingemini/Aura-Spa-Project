import { useState, useEffect } from "react";
import { Mail, CheckCircle2, Circle, Trash2, Calendar, Search } from "lucide-react";
import { toast } from "sonner";

const SERIF = { fontFamily: "'Playfair Display', serif" };

type Contact = {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  subject: string;
  message: string;
  status: "UNREAD" | "READ" | "REPLIED";
  createdAt: string;
};

export function AdminContacts() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      const res = await fetch("/api/contact");
      if (!res.ok) throw new Error("Failed to fetch contacts");
      const data = await res.json();
      setContacts(data.contacts || []);
    } catch (error) {
      toast.error("Failed to load contacts");
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id: string, currentStatus: string) => {
    const newStatus = currentStatus === "UNREAD" ? "READ" : "UNREAD";
    // In a real app, you would have a PUT endpoint
    // For now we'll optimistically update the UI
    setContacts(contacts.map((c) => (c.id === id ? { ...c, status: newStatus as "READ" | "UNREAD" } : c)));
    toast.success(`Marked as ${newStatus.toLowerCase()}`);
  };

  const deleteContact = async (id: string) => {
    if (!confirm("Are you sure you want to delete this message?")) return;
    // In a real app, you would have a DELETE endpoint
    setContacts(contacts.filter((c) => c.id !== id));
    toast.success("Message deleted");
  };

  const filteredContacts = contacts.filter((c) =>
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.subject.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 style={SERIF} className="text-gray-900 text-2xl font-semibold">Contact Messages</h1>
          <p className="text-gray-400 text-sm mt-1">Manage inquiries from the landing page</p>
        </div>
      </div>

      {/* Toolbar */}
      <div className="bg-white p-4 rounded-2xl border border-pink-100 flex flex-col sm:flex-row gap-4 items-center justify-between shadow-sm">
        <div className="relative w-full sm:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search messages..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-pink-50/40 border border-pink-200/60 rounded-xl text-sm focus:outline-none focus:border-pink-400 focus:bg-white transition-colors"
          />
        </div>
      </div>

      {/* Contacts List */}
      <div className="bg-white rounded-2xl border border-pink-100 shadow-sm overflow-hidden">
        {loading ? (
          <div className="p-8 text-center text-gray-400">Loading messages...</div>
        ) : filteredContacts.length === 0 ? (
          <div className="p-16 flex flex-col items-center justify-center text-center">
            <div className="w-16 h-16 rounded-full bg-pink-50 flex items-center justify-center mb-4">
              <Mail className="w-8 h-8 text-pink-300" />
            </div>
            <h3 style={SERIF} className="text-xl text-gray-900 mb-2">No messages</h3>
            <p className="text-gray-500 text-sm max-w-sm">
              {searchTerm ? "No messages matching your search." : "You're all caught up! No new messages right now."}
            </p>
          </div>
        ) : (
          <div className="divide-y divide-pink-50/80">
            {filteredContacts.map((contact) => (
              <div
                key={contact.id}
                className={`p-6 transition-colors ${contact.status === "UNREAD" ? "bg-pink-50/30" : "hover:bg-gray-50/50"}`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#EC4899] to-[#A855F7] flex items-center justify-center text-white font-medium shrink-0 shadow-sm shadow-pink-200">
                        {contact.name.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <h4 className={`text-sm ${contact.status === "UNREAD" ? "font-semibold text-gray-900" : "font-medium text-gray-700"}`}>
                          {contact.name}
                        </h4>
                        <div className="flex items-center gap-2 text-xs text-gray-500">
                          <a href={`mailto:${contact.email}`} className="hover:text-pink-500 transition-colors">
                            {contact.email}
                          </a>
                          {contact.phone && (
                            <>
                              <span>•</span>
                              <a href={`tel:${contact.phone}`} className="hover:text-pink-500 transition-colors">
                                {contact.phone}
                              </a>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-4 pl-12 pr-4">
                      <div className="inline-block px-2.5 py-1 rounded-full bg-gray-100 text-gray-600 text-[11px] font-medium uppercase tracking-wider mb-2">
                        {contact.subject}
                      </div>
                      <p className={`text-sm leading-relaxed ${contact.status === "UNREAD" ? "text-gray-800" : "text-gray-600"}`}>
                        {contact.message}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col items-end gap-3 shrink-0">
                    <div className="flex items-center gap-1.5 text-xs text-gray-400">
                      <Calendar className="w-3.5 h-3.5" />
                      {new Date(contact.createdAt).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit"
                      })}
                    </div>
                    
                    <div className="flex gap-2">
                      <button
                        onClick={() => updateStatus(contact.id, contact.status)}
                        className={`p-2 rounded-lg transition-colors tooltip-trigger ${
                          contact.status === "UNREAD" 
                            ? "bg-pink-100 text-pink-600 hover:bg-pink-200" 
                            : "bg-gray-100 text-gray-400 hover:text-gray-600 hover:bg-gray-200"
                        }`}
                        title={contact.status === "UNREAD" ? "Mark as Read" : "Mark as Unread"}
                      >
                        {contact.status === "UNREAD" ? <Circle className="w-4 h-4 fill-current" /> : <CheckCircle2 className="w-4 h-4" />}
                      </button>
                      <button
                        onClick={() => deleteContact(contact.id)}
                        className="p-2 rounded-lg bg-red-50 text-red-400 hover:bg-red-100 hover:text-red-600 transition-colors"
                        title="Delete message"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
