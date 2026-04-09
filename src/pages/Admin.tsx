import { useState, useRef } from "react";
import Icon from "@/components/ui/icon";

interface ModelEntry {
  id: number;
  name: string;
  file: File | null;
  fileName: string;
  size: string;
  material: string;
  price: string;
  status: "draft" | "published";
  uploadedAt: string;
}

const MOCK_MODELS: ModelEntry[] = [
  {
    id: 1,
    name: "Классический крест",
    file: null,
    fileName: "cross_classic.glb",
    size: "2.4 МБ",
    material: "Гранит чёрный",
    price: "45000",
    status: "published",
    uploadedAt: "12.03.2024",
  },
  {
    id: 2,
    name: "Стела «Элегия»",
    file: null,
    fileName: "stela_elegy.glb",
    size: "3.1 МБ",
    material: "Мрамор белый",
    price: "62000",
    status: "published",
    uploadedAt: "15.03.2024",
  },
  {
    id: 3,
    name: "Обелиск «Путь»",
    file: null,
    fileName: "",
    size: "—",
    material: "Габбро-диабаз",
    price: "90000",
    status: "draft",
    uploadedAt: "18.03.2024",
  },
];

export default function Admin() {
  const [models, setModels] = useState<ModelEntry[]>(MOCK_MODELS);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const [newModel, setNewModel] = useState({ name: "", material: "", price: "" });
  const [newFile, setNewFile] = useState<File | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const [deleteId, setDeleteId] = useState<number | null>(null);

  const handleFileDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file && (file.name.endsWith(".glb") || file.name.endsWith(".gltf"))) {
      setNewFile(file);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setNewFile(file);
  };

  const handleAddModel = () => {
    if (!newModel.name) return;
    const entry: ModelEntry = {
      id: Date.now(),
      name: newModel.name,
      file: newFile,
      fileName: newFile?.name ?? "",
      size: newFile ? `${(newFile.size / 1024 / 1024).toFixed(1)} МБ` : "—",
      material: newModel.material,
      price: newModel.price,
      status: "draft",
      uploadedAt: new Date().toLocaleDateString("ru-RU"),
    };
    setModels((prev) => [entry, ...prev]);
    setNewModel({ name: "", material: "", price: "" });
    setNewFile(null);
    setIsAddOpen(false);
  };

  const toggleStatus = (id: number) => {
    setModels((prev) =>
      prev.map((m) => (m.id === id ? { ...m, status: m.status === "published" ? "draft" : "published" } : m))
    );
  };

  const handleDelete = (id: number) => {
    setModels((prev) => prev.filter((m) => m.id !== id));
    setDeleteId(null);
  };

  const published = models.filter((m) => m.status === "published").length;
  const drafts = models.filter((m) => m.status === "draft").length;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-white/5 bg-card">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <a href="/" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
              <Icon name="ArrowLeft" size={16} />
              <span className="font-body text-sm">На сайт</span>
            </a>
            <div className="w-px h-4 bg-white/10" />
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 gradient-gold rounded-sm flex items-center justify-center">
                <span className="text-background text-[10px] font-bold">М</span>
              </div>
              <span className="font-display text-lg">
                Мемориал <span className="text-gradient-gold">3D</span>
              </span>
              <span className="font-body text-xs text-muted-foreground ml-1">/ Администратор</span>
            </div>
          </div>
          <button
            onClick={() => setIsAddOpen(true)}
            className="flex items-center gap-2 px-5 py-2.5 rounded-lg gradient-gold text-background font-body text-sm font-semibold hover:opacity-90 transition-opacity"
          >
            <Icon name="Plus" size={16} />
            Добавить модель
          </button>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-8">
        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          {[
            { label: "Всего моделей", value: models.length, icon: "Box" },
            { label: "Опубликовано", value: published, icon: "Eye", color: "text-emerald-400" },
            { label: "Черновики", value: drafts, icon: "EyeOff", color: "text-amber-400" },
          ].map((s, i) => (
            <div key={i} className="glass rounded-xl p-5 flex items-center gap-4">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                <Icon name={s.icon} size={20} className={s.color ?? "text-primary"} />
              </div>
              <div>
                <p className="font-body text-2xl font-bold text-foreground">{s.value}</p>
                <p className="font-body text-xs text-muted-foreground">{s.label}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Table */}
        <div className="glass rounded-2xl overflow-hidden">
          <div className="px-6 py-4 border-b border-white/5 flex items-center justify-between">
            <h2 className="font-display text-xl text-foreground">3D модели</h2>
            <span className="font-body text-xs text-muted-foreground">{models.length} записей</span>
          </div>

          {models.length === 0 ? (
            <div className="py-16 text-center">
              <Icon name="Box" size={40} className="text-muted-foreground/30 mx-auto mb-3" />
              <p className="font-body text-muted-foreground">Моделей пока нет. Добавьте первую!</p>
            </div>
          ) : (
            <div className="divide-y divide-white/5">
              {models.map((model) => (
                <div key={model.id} className="px-6 py-4 flex items-center gap-4 hover:bg-white/[0.02] transition-colors group">
                  {/* Icon */}
                  <div className="w-10 h-10 rounded-lg bg-card border border-white/5 flex items-center justify-center shrink-0">
                    <Icon name="Box" size={18} className="text-primary/60" />
                  </div>

                  {/* Name & file */}
                  <div className="flex-1 min-w-0">
                    <p className="font-body text-sm font-medium text-foreground truncate">{model.name}</p>
                    <div className="flex items-center gap-2 mt-0.5">
                      {model.fileName ? (
                        <span className="font-body text-xs text-muted-foreground flex items-center gap-1">
                          <Icon name="File" size={10} />
                          {model.fileName}
                        </span>
                      ) : (
                        <span className="font-body text-xs text-amber-500/70 flex items-center gap-1">
                          <Icon name="AlertCircle" size={10} />
                          Файл не загружен
                        </span>
                      )}
                      <span className="text-white/10">·</span>
                      <span className="font-body text-xs text-muted-foreground">{model.size}</span>
                    </div>
                  </div>

                  {/* Material */}
                  <div className="hidden md:block w-36 shrink-0">
                    <p className="font-body text-xs text-muted-foreground">{model.material}</p>
                  </div>

                  {/* Price */}
                  <div className="w-28 shrink-0">
                    <p className="font-body text-sm text-primary font-medium">
                      {model.price ? `${parseInt(model.price).toLocaleString("ru-RU")} ₽` : "—"}
                    </p>
                  </div>

                  {/* Date */}
                  <div className="hidden lg:block w-24 shrink-0">
                    <p className="font-body text-xs text-muted-foreground">{model.uploadedAt}</p>
                  </div>

                  {/* Status toggle */}
                  <button
                    onClick={() => toggleStatus(model.id)}
                    className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-body font-medium transition-all ${
                      model.status === "published"
                        ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 hover:bg-emerald-500/20"
                        : "bg-amber-500/10 text-amber-400 border border-amber-500/20 hover:bg-amber-500/20"
                    }`}
                  >
                    <Icon name={model.status === "published" ? "Eye" : "EyeOff"} size={10} />
                    {model.status === "published" ? "Опубликовано" : "Черновик"}
                  </button>

                  {/* Delete */}
                  {deleteId === model.id ? (
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleDelete(model.id)}
                        className="text-xs font-body text-red-400 hover:text-red-300 transition-colors"
                      >
                        Удалить
                      </button>
                      <button
                        onClick={() => setDeleteId(null)}
                        className="text-xs font-body text-muted-foreground hover:text-foreground transition-colors"
                      >
                        Отмена
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => setDeleteId(model.id)}
                      className="opacity-0 group-hover:opacity-100 transition-opacity p-1.5 rounded-lg hover:bg-red-500/10 text-muted-foreground hover:text-red-400"
                    >
                      <Icon name="Trash2" size={14} />
                    </button>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      {/* Add Model Modal */}
      {isAddOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsAddOpen(false)} />
          <div className="relative z-10 w-full max-w-lg glass rounded-2xl p-6 border border-white/10">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-display text-2xl text-foreground">Новая 3D модель</h3>
              <button
                onClick={() => setIsAddOpen(false)}
                className="p-1.5 rounded-lg hover:bg-white/5 text-muted-foreground hover:text-foreground transition-colors"
              >
                <Icon name="X" size={18} />
              </button>
            </div>

            {/* Drop zone */}
            <div
              className={`relative rounded-xl border-2 border-dashed p-8 text-center mb-5 transition-all cursor-pointer ${
                dragOver ? "border-primary/60 bg-primary/5" : "border-white/10 hover:border-white/20"
              }`}
              onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
              onDragLeave={() => setDragOver(false)}
              onDrop={handleFileDrop}
              onClick={() => fileRef.current?.click()}
            >
              <input
                ref={fileRef}
                type="file"
                accept=".glb,.gltf"
                className="hidden"
                onChange={handleFileChange}
              />
              {newFile ? (
                <div className="flex items-center justify-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/15 border border-primary/25 flex items-center justify-center">
                    <Icon name="Box" size={20} className="text-primary" />
                  </div>
                  <div className="text-left">
                    <p className="font-body text-sm text-foreground font-medium">{newFile.name}</p>
                    <p className="font-body text-xs text-muted-foreground">
                      {(newFile.size / 1024 / 1024).toFixed(1)} МБ
                    </p>
                  </div>
                  <button
                    className="ml-auto p-1 hover:text-red-400 text-muted-foreground transition-colors"
                    onClick={(e) => { e.stopPropagation(); setNewFile(null); }}
                  >
                    <Icon name="X" size={14} />
                  </button>
                </div>
              ) : (
                <>
                  <div className="w-12 h-12 mx-auto rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-3">
                    <Icon name="Upload" size={22} className="text-primary/70" />
                  </div>
                  <p className="font-body text-sm text-foreground mb-1">Перетащите файл или нажмите для выбора</p>
                  <p className="font-body text-xs text-muted-foreground">Форматы: .glb, .gltf · Макс. 50 МБ</p>
                </>
              )}
            </div>

            {/* Fields */}
            <div className="space-y-3">
              <div>
                <label className="block font-body text-xs text-muted-foreground mb-1.5">Название *</label>
                <input
                  type="text"
                  placeholder="Стела «Элегия»"
                  value={newModel.name}
                  onChange={(e) => setNewModel({ ...newModel, name: e.target.value })}
                  className="w-full bg-secondary/50 border border-white/8 rounded-lg px-4 py-2.5 font-body text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/40 transition-colors"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-body text-xs text-muted-foreground mb-1.5">Материал</label>
                  <input
                    type="text"
                    placeholder="Гранит чёрный"
                    value={newModel.material}
                    onChange={(e) => setNewModel({ ...newModel, material: e.target.value })}
                    className="w-full bg-secondary/50 border border-white/8 rounded-lg px-4 py-2.5 font-body text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/40 transition-colors"
                  />
                </div>
                <div>
                  <label className="block font-body text-xs text-muted-foreground mb-1.5">Цена от (₽)</label>
                  <input
                    type="number"
                    placeholder="45000"
                    value={newModel.price}
                    onChange={(e) => setNewModel({ ...newModel, price: e.target.value })}
                    className="w-full bg-secondary/50 border border-white/8 rounded-lg px-4 py-2.5 font-body text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/40 transition-colors"
                  />
                </div>
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setIsAddOpen(false)}
                className="flex-1 py-2.5 rounded-lg border border-white/10 font-body text-sm text-muted-foreground hover:text-foreground hover:border-white/20 transition-all"
              >
                Отмена
              </button>
              <button
                onClick={handleAddModel}
                disabled={!newModel.name}
                className="flex-1 py-2.5 rounded-lg gradient-gold text-background font-body text-sm font-semibold disabled:opacity-40 hover:opacity-90 transition-opacity"
              >
                Добавить
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
