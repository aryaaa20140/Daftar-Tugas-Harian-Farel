
import express from 'express'
import cors from 'cors'
import prisma from './prisma'

const app = express()

// Middleware
app.use(cors())
app.use(express.json())

// =========================
// GET /
// Cek apakah backend berjalan
// =========================
app.get('/', (req, res) => {
  res.json({
    message: 'Backend Management-Tugas berhasil jalan!',
  })
})

// =========================
// GET /test-db
// Cek koneksi database
// =========================
app.get('/test-db', async (req, res) => {
  try {
    const tasks = await prisma.task.findMany()

    res.json({
      message: 'Database berhasil terhubung!',
      tasks,
    })
  } catch (error) {
    console.error(error)

    res.status(500).json({
      message: 'Gagal terhubung ke database',
    })
  }
})

// =========================
// GET /tasks
// Mengambil semua tugas
// =========================
app.get('/tasks', async (req, res) => {
  try {
    const tasks = await prisma.task.findMany({
      orderBy: {
        dueDate: 'asc',
      },
    })

    res.json(tasks)
  } catch (error) {
    console.error(error)

    res.status(500).json({
      message: 'Gagal mengambil tugas',
    })
  }
})

// =========================
// POST /tasks
// Menambahkan tugas baru
// =========================
app.post('/tasks', async (req, res) => {
  try {
    const { title, description, subject, dueDate } = req.body

    const task = await prisma.task.create({
      data: {
        title,
        description,
        subject,
        dueDate: new Date(dueDate),
      },
    })

    res.status(201).json(task)
  } catch (error) {
    console.error(error)

    res.status(500).json({
      message: 'Gagal menambahkan tugas',
    })
  }
})

// =========================
// PATCH /tasks/:id
// Mengubah tugas
// =========================
app.patch('/tasks/:id', async (req, res) => {
  try {
    const id = Number(req.params.id)

    const {
      title,
      description,
      subject,
      dueDate,
      completed,
    } = req.body

    const task = await prisma.task.update({
      where: {
        id,
      },
      data: {
        ...(title !== undefined && { title }),
        ...(description !== undefined && { description }),
        ...(subject !== undefined && { subject }),
        ...(dueDate !== undefined && {
          dueDate: new Date(dueDate),
        }),
        ...(completed !== undefined && { completed }),
      },
    })

    res.json(task)
  } catch (error) {
    console.error(error)

    res.status(500).json({
      message: 'Gagal mengubah tugas',
    })
  }
})

// =========================
// DELETE /tasks/:id
// Menghapus tugas
// =========================
app.delete('/tasks/:id', async (req, res) => {
  try {
    const id = Number(req.params.id)

    await prisma.task.delete({
      where: {
        id,
      },
    })

    res.json({
      message: 'Tugas berhasil dihapus',
    })
  } catch (error) {
    console.error(error)

    res.status(500).json({
      message: 'Gagal menghapus tugas',
    })
  }
})

// Export untuk Vercel
export default app

