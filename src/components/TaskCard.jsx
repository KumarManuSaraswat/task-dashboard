const TaskCard = ({ task, onClick }) => {
  return (
    <div 
      className={`bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-all cursor-pointer border-l-4 ${
        task.completed 
          ? 'border-green-500 hover:bg-green-50' 
          : 'border-yellow-500 hover:bg-yellow-50'
      }`}
      onClick={() => onClick(task.id)}
    >
      <h3 className="text-xl font-semibold text-gray-800 mb-2 truncate">
        {task.title}
      </h3>
      <p className="text-gray-600 text-sm mb-4 line-clamp-2">
        {task.body || 'No description available'}
      </p>
      <div className="flex items-center justify-between">
        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
          task.completed 
            ? 'bg-green-100 text-green-800' 
            : 'bg-yellow-100 text-yellow-800'
        }`}>
          {task.completed ? 'Completed' : 'Pending'}
        </span>
        <span className="text-sm text-gray-500">ID: {task.id}</span>
      </div>
    </div>
  );
};

export default TaskCard;
