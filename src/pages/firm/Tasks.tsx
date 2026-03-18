import { useEffect, useState } from 'react';
import { insforge } from '../../lib/insforge';
import { CheckSquare, Plus, Clock, Loader2, CheckCircle2 } from 'lucide-react';

export default function Tasks() {
  const [tasks, setTasks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTasks = async () => {
      const { data } = await insforge.database.from('tasks').select('*').order('due_date', { ascending: true });
      setTasks(data || []);
      setLoading(false);
    };
    fetchTasks();
  }, []);

  const getPriorityColor = (dueDate: string) => {
    const hours = (new Date(dueDate).getTime() - new Date().getTime()) / (1000 * 60 * 60);
    if (hours < 0) return 'text-red-600';
    if (hours < 24) return 'text-amber-600';
    return 'text-emerald-600';
  };

  return (
    <div className="space-y-6 text-left">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-textMain mb-1">Task Management</h1>
          <p className="text-gray-500">Track deadlines, assignments, and follow-ups.</p>
        </div>
        <button className="bg-primary hover:bg-opacity-90 text-white px-4 py-2 rounded-twelve flex items-center gap-2 transition-all shadow-lg shadow-primary/20">
          <Plus size={20} />
          Create Task
        </button>
      </div>

      <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-gray-200">
        <button className="px-5 py-2 bg-primary text-white rounded-full text-sm font-medium whitespace-nowrap">All Tasks</button>
        <button className="px-5 py-2 bg-white border border-gray-100 text-gray-500 hover:text-primary rounded-full text-sm font-medium whitespace-nowrap transition-colors card-shadow">High Priority</button>
        <button className="px-5 py-2 bg-white border border-gray-100 text-gray-500 hover:text-primary rounded-full text-sm font-medium whitespace-nowrap transition-colors card-shadow">Due Today</button>
        <button className="px-5 py-2 bg-white border border-gray-100 text-gray-500 hover:text-primary rounded-full text-sm font-medium whitespace-nowrap transition-colors card-shadow">Completed</button>
      </div>

      <div className="bg-white border border-gray-100 rounded-twelve min-h-[400px] card-shadow overflow-hidden">
        {loading ? (
          <div className="w-full h-96 flex flex-col items-center justify-center text-gray-400">
            <Loader2 className="animate-spin mb-4" size={32} />
            <p>Syncing your schedule...</p>
          </div>
        ) : tasks.length === 0 ? (
          <div className="p-20 text-center">
            <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckSquare className="text-gray-300" size={32} />
            </div>
            <h3 className="text-lg font-semibold text-textMain mb-1">No Pending Tasks</h3>
            <p className="text-gray-500">Great job! You've cleared your current task list.</p>
          </div>
        ) : (
          <div className="divide-y divide-gray-50">
            {tasks.map((task) => (
              <div key={task.id} className="flex items-center gap-4 p-5 hover:bg-gray-50 transition-all group">
                <button className="w-6 h-6 rounded border-2 border-gray-200 flex items-center justify-center group-hover:border-primary transition-colors">
                  <CheckCircle2 size={16} className="text-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                </button>
                <div className="flex-1">
                  <h4 className="text-textMain font-medium mb-1">{task.title}</h4>
                  <p className="text-gray-500 text-sm line-clamp-1">{task.description}</p>
                </div>
                <div className="flex items-center gap-6">
                  <div className="flex flex-col items-end">
                    <div className={`flex items-center gap-1.5 text-xs font-bold ${getPriorityColor(task.due_date)}`}>
                      <Clock size={12} />
                      {new Date(task.due_date).toLocaleDateString()}
                    </div>
                    <span className="text-[10px] text-gray-400 mt-0.5">Deadline</span>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-gray-100 border border-gray-200 flex items-center justify-center text-[10px] font-bold text-gray-500">
                    JD
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
