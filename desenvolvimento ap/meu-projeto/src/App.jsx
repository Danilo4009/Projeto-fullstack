import { useState } from "react";
import "./App.css";

function App() {
  const [usuarios, setUsuarios] = useState([]);
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [editIndex, setEditIndex] = useState(null);

  const saveUser = (users) => {
    localStorage.setItem("storage-user", JSON.stringify(users));
  };

  //

  const users = localStorage.getItem("storage-user");

  const usersParsed = JSON.parse(users);

  //

  const handleSubmit = (e) => {
    e.preventDefault();

    if (editIndex !== null) {
      const usuariosAtualizados = [...usuarios];
      usuariosAtualizados[editIndex] = { nome, email };

      saveUser(usuariosAtualizados);

      setEditIndex(null);
    } else {
      setUsuarios([...usuarios, { nome, email }]);
      saveUser([...usuarios, { nome, email }]);
    }

    setNome("");
    setEmail("");
  };

  const handleEdit = (index) => {
    setNome(usuarios[index].nome);
    setEmail(usuarios[index].email);
    setEditIndex(index);
  };

  const handleDelete = (index) => {
    setUsuarios(usuarios.filter((_, i) => i !== index));
  };

  return (
    <div className="container">
      <h2>Cadastro de Usuários</h2>

      {/* Formulário */}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Nome:</label>
          <input
            type="text"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>E-mail:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <button type="submit">
          {editIndex !== null ? "Atualizar" : "Cadastrar"}
        </button>
      </form>

      {/* Lista de Usuários */}
      <h3>Usuários Cadastrados</h3>
      <ul>
        {usuarios.map((user, index) => (
          <li key={index}>
            {user.nome} - {user.email}{" "}
            <button className="edit-btn" onClick={() => handleEdit(index)}>
              Editar
            </button>
            <button className="delete-btn" onClick={() => handleDelete(index)}>
              Excluir
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
