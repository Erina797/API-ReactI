const Header=({handleSearch, handleSort})=>{
    return(
        <header>
          <nav className="navbar d-flex justify-content-between align-items-center bg-opacity border text-start px-3">
            <div>
              <img
                src="https://cdn-icons-png.flaticon.com/512/169/169367.png?w=740&t=st=1673913046~exp=1673913646~hmac=cc8628062231004f2c016d477291df3c9c16428e20d216eac46bd79c072dbdb3"
                alt="Logo Clima"
                width="30"
                height="30"
                className="d-inline-block mb-1 me-1"
              />
              <a className="navbar-brand text-light mt-3" href="#">
                Reportes Meteorológicos Chile
              </a>
            </div>
            <form
              className="d-flex flex-column w-50 align-items-center"
              action=""
            >
              <input
                type="search"
                name="searchInput"
                id=""
                className="form-control me-2"
                placeholder="Buscar..."
                onChange={handleSearch}
                
              />
              <label htmlFor="">
                Ingrese Nombre de Estación Meteorológica o Comuna de Chile
              </label>
              <select name="selectSort" id="selectSort" className="form-select" onChange={handleSort}>
                <option hidden>Ordenar...</option>
                <option value="1">Sur a Norte</option>
                <option value="2">Norte a Sur</option>
                <option value="3">Mayor a Menor T°</option>
                <option value="4">Menor a Mayor T°</option>
              </select>
            </form>
          </nav>
        </header>
    )
}

export default Header;