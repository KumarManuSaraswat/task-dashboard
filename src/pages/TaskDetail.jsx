import { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';

const TaskDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchTask();
  }, [id]);

  const fetchTask = async () => {
    try {
      setLoading(true);
      const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`);
      if (!response.ok) throw new Error('Task not found');
      const data = await response.json();
      setTask(data);
      setError('');
    } catch (err) {
      setError('Task not found.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div>
      <button
        onClick={() => navigate(-1)}
        className="mb-8 inline-flex items-center px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition"
      >
        ← Back to Tasks
      </button>

      {error ? (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      ) : task ? (
        <div className="bg-white p-8 rounded-xl shadow-2xl max-w-2xl mx-auto">
          <div className={`inline-flex px-4 py-2 rounded-full text-sm font-medium mb-6 ${
            task.completed 
              ? 'bg-green-100 text-green-800' 
              : 'bg-yellow-100 text-yellow-800'
          }`}>
            {task.completed ? 'Completed' : 'Pending'}
          </div>
          
          <h1 className="text-3xl font-bold text-gray-800 mb-4">{task.title}</h1>
          
          <div className="flex items-center text-gray-500 mb-8">
            <span className="bg-gray-100 px-3 py-1 rounded-full text-sm">
              Task ID: {task.id}
            </span>
          </div>

          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-gray-700 mb-2">Status</h3>
              <p className={`font-medium ${
                task.completed ? 'text-green-600' : 'text-yellow-600'
              }`}>
                {task.completed ? '✅ Completed' : '⏳ Pending'}
              </p>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default TaskDetail;
