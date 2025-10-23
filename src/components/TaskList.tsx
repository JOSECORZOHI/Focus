import { ListChecks } from 'lucide-react';
import type { Task } from '../types';
import { TaskItem } from './TaskItem';

interface TaskListProps {
  tasks: Task[];
  onToggle: (id: string, newEstado: 'pendiente' | 'completada') => Promise<void>;
  onDelete: (id: string) => Promise<void>;
  onUpdate: (id: string, titulo: string, descripcion: string) => Promise<void>;
}

export function TaskList({ tasks, onToggle, onDelete, onUpdate }: TaskListProps) {
  const pendientes = tasks.filter(t => t.estado === 'pendiente');
  const completadas = tasks.filter(t => t.estado === 'completada');

  if (tasks.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-slate-100 rounded-full mb-4">
          <ListChecks size={32} className="text-slate-400" />
        </div>
        <h3 className="text-xl font-semibold text-slate-900 mb-2">No hay tareas</h3>
        <p className="text-slate-600">Comienza agregando tu primera tarea</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {pendientes.length > 0 && (
        <div>
          <h2 className="text-sm font-semibold text-slate-500 uppercase tracking-wide mb-3">
            Pendientes ({pendientes.length})
          </h2>
          <div className="space-y-3">
            {pendientes.map(task => (
              <TaskItem
                key={task.id}
                task={task}
                onToggle={onToggle}
                onDelete={onDelete}
                onUpdate={onUpdate}
              />
            ))}
          </div>
        </div>
      )}

      {completadas.length > 0 && (
        <div>
          <h2 className="text-sm font-semibold text-slate-500 uppercase tracking-wide mb-3">
            Completadas ({completadas.length})
          </h2>
          <div className="space-y-3">
            {completadas.map(task => (
              <TaskItem
                key={task.id}
                task={task}
                onToggle={onToggle}
                onDelete={onDelete}
                onUpdate={onUpdate}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
