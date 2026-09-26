import { useState } from 'react'
import type { Task } from '../types/task'

interface AddTaskFormProps {
  onAddTask: (task: Task) => void
}

function AddTaskForm({ onAddTask }: AddTaskFormProps) {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [subject, setSubject] = useState('')
  const [dueDate, setDueDate] = useState('')

  async function handleSubmit() {
    try {
      const response = await fetch('http://localhost:3000/tasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title,
          description,
          subject,
          dueDate,
        }),
      })

      if (!response.ok) {
        throw new Error('Gagal menambahkan tugas')
      }

      const newTask: Task = await response.json()

      onAddTask(newTask)

      setTitle('')
      setDescription('')
      setSubject('')
      setDueDate('')
    } catch (error) {
      console.error('Gagal menambahkan tugas:', error)
    }
  }

  return (
    <div>
      <h2>Tambah Tugas</h2>

      <input
        type="text"
        placeholder="Masukkan judul tugas"
        value={title}
        onChange={(event) => setTitle(event.target.value)}
      />

      <input
        type="text"
        placeholder="Masukkan deskripsi tugas"
        value={description}
        onChange={(event) => setDescription(event.target.value)}
      />

      <input
        type="text"
        placeholder="Mata pelajaran"
        value={subject}
        onChange={(event) => setSubject(event.target.value)}
      />

      <input
        type="date"
        value={dueDate}
        onChange={(event) => setDueDate(event.target.value)}
      />

      <button type="button" onClick={handleSubmit}>
        Simpan
      </button>
    </div>
  )
}

export default AddTaskForm