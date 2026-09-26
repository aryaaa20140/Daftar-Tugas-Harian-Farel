import { useState } from 'react'
import type { Task } from '../types/task'

interface TaskCardProps {
  task: Task
  onTaskUpdated: (task: Task) => void
  onTaskDeleted: (taskId: number) => void
}

function TaskCard({
  task,
  onTaskUpdated,
  onTaskDeleted,
}: TaskCardProps) {
  const [loading, setLoading] = useState(false)
  const [isEditing, setIsEditing] = useState(false)

  const [title, setTitle] = useState(task.title)
  const [description, setDescription] = useState(task.description)
  const [subject, setSubject] = useState(task.subject)
  const [dueDate, setDueDate] = useState(task.dueDate.slice(0, 10))

  async function handleToggleCompleted() {
    try {
      setLoading(true)

      const response = await fetch(
        `http://localhost:3000/tasks/${task.id}`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            completed: !task.completed,
          }),
        }
      )

      if (!response.ok) {
        throw new Error('Gagal mengubah status tugas')
      }

      const updatedTask: Task = await response.json()

      onTaskUpdated(updatedTask)
    } catch (error) {
      console.error('Gagal mengubah status tugas:', error)
    } finally {
      setLoading(false)
    }
  }

  async function handleEdit() {
    try {
      setLoading(true)

      const response = await fetch(
        `http://localhost:3000/tasks/${task.id}`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            title,
            description,
            subject,
            dueDate,
          }),
        }
      )

      if (!response.ok) {
        throw new Error('Gagal mengedit tugas')
      }

      const updatedTask: Task = await response.json()

      onTaskUpdated(updatedTask)
      setIsEditing(false)
    } catch (error) {
      console.error('Gagal mengedit tugas:', error)
    } finally {
      setLoading(false)
    }
  }

  async function handleDelete() {
    const yakin = window.confirm(
      'Apakah kamu yakin ingin menghapus tugas ini?'
    )

    if (!yakin) {
      return
    }

    try {
      setLoading(true)

      const response = await fetch(
        `http://localhost:3000/tasks/${task.id}`,
        {
          method: 'DELETE',
        }
      )

      if (!response.ok) {
        throw new Error('Gagal menghapus tugas')
      }

      onTaskDeleted(task.id)
    } catch (error) {
      console.error('Gagal menghapus tugas:', error)
    } finally {
      setLoading(false)
    }
  }

  function handleCancelEdit() {
    setTitle(task.title)
    setDescription(task.description)
    setSubject(task.subject)
    setDueDate(task.dueDate.slice(0, 10))
    setIsEditing(false)
  }

  if (isEditing) {
    return (
      <div className="task-card">
        <h3>Edit Tugas</h3>

        <input
          type="text"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          placeholder="Judul tugas"
        />

        <input
          type="text"
          value={description}
          onChange={(event) => setDescription(event.target.value)}
          placeholder="Deskripsi tugas"
        />

        <input
          type="text"
          value={subject}
          onChange={(event) => setSubject(event.target.value)}
          placeholder="Mata pelajaran"
        />

        <input
          type="date"
          value={dueDate}
          onChange={(event) => setDueDate(event.target.value)}
        />

        <button
          type="button"
          onClick={handleEdit}
          disabled={loading}
        >
          {loading ? 'Menyimpan...' : '💾 Simpan'}
        </button>

        <button
          type="button"
          onClick={handleCancelEdit}
          disabled={loading}
        >
          ❌ Batal
        </button>
      </div>
    )
  }

  return (
    <div className="task-card">
      <h3>{task.title}</h3>

      <p>{task.description}</p>

      <p>📚 Mata Pelajaran: {task.subject}</p>

      <p>📅 Dikumpulkan: {task.dueDate.slice(0, 10)}</p>

      <button
        type="button"
        onClick={handleToggleCompleted}
        disabled={loading}
      >
        {loading
          ? 'Menyimpan...'
          : task.completed
            ? '✅ Selesai'
            : '⏳ Belum selesai'}
      </button>

      <button
        type="button"
        onClick={() => setIsEditing(true)}
        disabled={loading}
      >
        ✏️ Edit
      </button>

      <button
        type="button"
        onClick={handleDelete}
        disabled={loading}
      >
        🗑️ Hapus
      </button>
    </div>
  )
}

export default TaskCard