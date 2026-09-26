function Profil() {
  return (
    <main className="page-container">

      <div className="page-header">
        <div className="page-icon">
          👤
        </div>

        <div>
          <h1>Profil</h1>

          <p>
            Informasi pengguna aplikasi.
          </p>
        </div>
      </div>

      <div className="profile-card">

        <div className="profile-avatar">
          F
        </div>

        <h1>Farel</h1>

        <p>
          Pengguna Management Tugas
        </p>

        <div className="profile-info">

          <div>
            <span>📚</span>

            <strong>
              Pelajar
            </strong>

            <p>
              Status pengguna
            </p>
          </div>

          <div>
            <span>📝</span>

            <strong>
              Management Tugas
            </strong>

            <p>
              Aplikasi pengelola tugas
            </p>
          </div>

          <div>
            <span>🎓</span>

            <strong>
              Sekolah
            </strong>

            <p>
              Manajemen pekerjaan rumah
            </p>
          </div>

          <div>
            <span>⚡</span>

            <strong>
              Aktif
            </strong>

            <p>
              Status aplikasi
            </p>
          </div>

        </div>

      </div>

    </main>
  )
}

export default Profil