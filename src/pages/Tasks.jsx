import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import TaskCard from '../components/TaskCard';

const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const response = await fetch('https://jsonplaceholder.typicode.com/todos?_limit=10');
      const data = await response.json();
      setTasks(data);
      setError('');
    } catch (err) {
      setError('Failed to fetch tasks. Please try refreshing.');
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
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">All Tasks</h1>
        <button
          onClick={fetchTasks}
          disabled={loading}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
        >
          Refresh
        </button>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tasks.map(task => (
          <Link key={task.id} to={`/tasks/${task.id}`} state={{ task }}>
            <TaskCard task={task} />
          </Link>
        ))}
      </div>

      {tasks.length === 0 && !loading && (
        <p className="text-center text-gray-500 py-12">No tasks available.</p>
      )}
    </div>
  );
};

export default Tasks;
