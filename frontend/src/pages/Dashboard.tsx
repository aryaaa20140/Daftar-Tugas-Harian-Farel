import { useEffect, useState } from 'react'
import TaskCard from '../components/TaskCard'
import AddTaskForm from '../components/AddTaskForm'
import type { Task } from '../types/task'

function Dashboard() {
  const [tasks, setTasks] = useState<Task[]>([])

  const [statusFilter, setStatusFilter] = useState('all')
  const [subjectFilter, setSubjectFilter] = useState('all')

  useEffect(() => {
    fetch('http://localhost:3000/tasks')
      .then((response) => response.json())
      .then((data) => {
        setTasks(data)
      })
      .catch((error) => {
        console.error('Gagal mengambil tugas:', error)
      })
  }, [])

  function handleAddTask(newTask: Task) {
    setTasks((currentTasks) => [...currentTasks, newTask])
  }

  function handleTaskUpdated(updatedTask: Task) {
    setTasks((currentTasks) =>
      currentTasks.map((task) =>
        task.id === updatedTask.id ? updatedTask : task
      )
    )
  }

  function handleTaskDeleted(taskId: number) {
    setTasks((currentTasks) =>
      currentTasks.filter((task) => task.id !== taskId)
    )
  }

  const subjects = Array.from(
    new Set(tasks.map((task) => task.subject))
  )

  const filteredTasks = tasks.filter((task) => {
    const statusMatch =
      statusFilter === 'all' ||
      (statusFilter === 'completed' && task.completed) ||
      (statusFilter === 'pending' && !task.completed)

    const subjectMatch =
      subjectFilter === 'all' ||
      task.subject === subjectFilter

    return statusMatch && subjectMatch
  })

  // =========================
  // STATISTIK
  // =========================

  const totalTasks = tasks.length

  const completedTasks = tasks.filter(
    (task) => task.completed
  ).length

  const pendingTasks = tasks.filter(
    (task) => !task.completed
  ).length

  return (
    <main className="dashboard">

      {/* =========================
          HEADER
      ========================= */}

      <h1>Daftar Pekerjaan Rumah Farel</h1>

      <p>
        Kelola semua pekerjaan rumahmu dengan lebih mudah.
      </p>

      {/* =========================
          STATISTIK
      ========================= */}

      <div className="stats">

        <div className="stat-card">
          <span className="stat-icon">
            📚
          </span>

          <div>
            <p>Total Tugas</p>

            <h2>
              {totalTasks}
            </h2>
          </div>
        </div>

        <div className="stat-card completed-stat">
          <span className="stat-icon">
            ✅
          </span>

          <div>
            <p>Tugas Selesai</p>

            <h2>
              {completedTasks}
            </h2>
          </div>
        </div>

        <div className="stat-card pending-stat">
          <span className="stat-icon">
            ⏳
          </span>

          <div>
            <p>Belum Selesai</p>

            <h2>
              {pendingTasks}
            </h2>
          </div>
        </div>

      </div>

      {/* =========================
          TAMBAH TUGAS
      ========================= */}

      <AddTaskForm
        onAddTask={handleAddTask}
      />

      {/* =========================
          FILTER
      ========================= */}

      <div className="filters">

        <div>
          <label htmlFor="status-filter">
            Status:
          </label>

          <select
            id="status-filter"
            value={statusFilter}
            onChange={(event) =>
              setStatusFilter(event.target.value)
            }
          >
            <option value="all">
              Semua
            </option>

            <option value="pending">
              Belum selesai
            </option>

            <option value="completed">
              Selesai
            </option>
          </select>
        </div>

        <div>
          <label htmlFor="subject-filter">
            Mata Pelajaran:
          </label>

          <select
            id="subject-filter"
            value={subjectFilter}
            onChange={(event) =>
              setSubjectFilter(event.target.value)
            }
          >
            <option value="all">
              Semua
            </option>

            {subjects.map((subject) => (
              <option
                key={subject}
                value={subject}
              >
                {subject}
              </option>
            ))}
          </select>
        </div>

      </div>

      {/* =========================
          DAFTAR TUGAS
      ========================= */}

      <div className="task-list">

        {filteredTasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            onTaskUpdated={handleTaskUpdated}
            onTaskDeleted={handleTaskDeleted}
          />
        ))}

      </div>

      {/* =========================
          TIDAK ADA TUGAS
      ========================= */}

      {filteredTasks.length === 0 && (
        <p>
          Tidak ada tugas yang sesuai dengan filter.
        </p>
      )}

    </main>
  )
}

export default Dashboard