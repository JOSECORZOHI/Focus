import { useState } from 'react';
import { Check, Trash2, Edit2, X, Save } from 'lucide-react';
import type { Task } from '../types';

interface TaskItemProps {
  task: Task;
  onToggle: (id: string, newEstado: 'pendiente' | 'completada') => Promise<void>;
  onDelete: (id: string) => Promise<void>;
  onUpdate: (id: string, titulo: string, descripcion: string) => Promise<void>;
}

export function TaskItem({ task, onToggle, onDelete, onUpdate }: TaskItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitulo, setEditTitulo] = useState(task.titulo);
  const [editDescripcion, setEditDescripcion] = useState(task.descripcion);
  const [isLoading, setIsLoading] = useState(false);

  const handleSave = async () => {
    if (!editTitulo.trim()) return;

    setIsLoading(true);
    try {
      await onUpdate(task.id, editTitulo.trim(), editDescripcion.trim());
      setIsEditing(false);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    setEditTitulo(task.titulo);
    setEditDescripcion(task.descripcion);
    setIsEditing(false);
  };

  const handleToggle = async () => {
    setIsLoading(true);
    try {
      const newEstado = task.estado === 'pendiente' ? 'completada' : 'pendiente';
      await onToggle(task.id, newEstado);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async () => {
    setIsLoading(true);
    try {
      await onDelete(task.id);
    } finally {
      setIsLoading(false);
    }
  };

  if (isEditing) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4">
        <div className="space-y-3">
          <input
            type="text"
            value={editTitulo}
            onChange={(e) => setEditTitulo(e.target.value)}
            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-900 focus:border-transparent outline-none"
            disabled={isLoading}
          />
          <textarea
            value={editDescripcion}
            onChange={(e) => setEditDescripcion(e.target.value)}
            rows={2}
            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-900 focus:border-transparent outline-none resize-none"
            placeholder="Descripción (opcional)"
            disabled={isLoading}
          />
          <div className="flex gap-2">
            <button
              onClick={handleSave}
              disabled={isLoading || !editTitulo.trim()}
              className="flex-1 bg-slate-900 text-white px-4 py-2 rounded-lg font-medium hover:bg-slate-800 transition disabled:opacity-50 flex items-center justify-center gap-2"
            >
              <Save size={16} />
              Guardar
            </button>
            <button
              onClick={handleCancel}
              disabled={isLoading}
              className="flex-1 bg-slate-200 text-slate-700 px-4 py-2 rounded-lg font-medium hover:bg-slate-300 transition disabled:opacity-50 flex items-center justify-center gap-2"
            >
              <X size={16} />
              Cancelar
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`bg-white rounded-xl shadow-sm border border-slate-200 p-4 transition-all hover:shadow-md ${
      task.estado === 'completada' ? 'opacity-75' : ''
    }`}>
      <div className="flex items-start gap-3">
        <button
          onClick={handleToggle}
          disabled={isLoading}
          className={`flex-shrink-0 w-6 h-6 rounded-full border-2 transition-all flex items-center justify-center mt-0.5 ${
            task.estado === 'completada'
              ? 'bg-green-500 border-green-500'
              : 'border-slate-300 hover:border-slate-400'
          }`}
        >
          {task.estado === 'completada' && <Check size={14} className="text-white" />}
        </button>

        <div className="flex-1 min-w-0">
          <h3 className={`font-medium text-slate-900 ${
            task.estado === 'completada' ? 'line-through text-slate-500' : ''
          }`}>
            {task.titulo}
          </h3>
          {task.descripcion && (
            <p className={`text-sm text-slate-600 mt-1 ${
              task.estado === 'completada' ? 'line-through' : ''
            }`}>
              {task.descripcion}
            </p>
          )}
        </div>

        <div className="flex gap-2 flex-shrink-0">
          <button
            onClick={() => setIsEditing(true)}
            disabled={isLoading}
            className="p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition disabled:opacity-50"
          >
            <Edit2 size={16} />
          </button>
          <button
            onClick={handleDelete}
            disabled={isLoading}
            className="p-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition disabled:opacity-50"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
