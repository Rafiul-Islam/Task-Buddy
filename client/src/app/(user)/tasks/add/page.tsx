import AddTaskHeader from "./components/AddTaskHeader";
import AddTaskForm from "./components/AddTaskForm";

const AddTaskPage = () => {
  return (
    <div className="min-h-screen p-8">
      <div className="max-w-2xl mx-auto px-4">
        <AddTaskHeader />
        <AddTaskForm />
      </div>
    </div>
  );
};

export default AddTaskPage;