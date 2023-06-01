const Character = ({ name, game, removeCharacter }) => (
  <div className="card">
    <div className="card-body">
      <p>{name} is from the game {game}</p>
      <button
        type="button"
        className="btn btn-danger"
        onClick={() => removeCharacter(name)}>Delete {name}
      </button>
    </div>
  </div>
)

export default Character;
