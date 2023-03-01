import { useNavigate, useLocation } from "react-router-dom"
import { useForm } from "../../hooks/useForm"
import { getHeroesByName } from "../../selectors/getHeroesByName"
import { HeroCard } from "../hero/HeroCard"
import queryString from 'query-string'
import { useMemo } from "react"

export const SearchScreen = () => {

    const navigate = useNavigate();
    const location = useLocation();

    const {q = ''} = queryString.parse(location.search)

    const [formValues, handleInputChange] = useForm({
        searchText: q
    })

    const {searchText} = formValues
    
    const heroesFiltered = useMemo(() => getHeroesByName(q), [q])

    const handleSearch = (e) => {
        e.preventDefault()
        navigate(`?q=${searchText}`)
    }
    
    return (
        <>
            <h1>Busquedas</h1>
            <hr/>

            <div className="row">
                <div className="col-5">
                    
                    <h4>Buscar</h4>
                    <hr />

                    <form onSubmit={handleSearch}>
                        <input 
                            type='text'
                            placeholder="Buscar un Heroe"
                            className="form-control"
                            name='searchText'
                            autoComplete="off"
                            onChange={handleInputChange}
                            value={searchText}
                            
                        />

                        <button
                            className="btn btn-outline-primary mt-1"
                            type="submit"
                        >
                            Buscar...
                        </button>
                    </form>
                </div>
                <div className="col-7">
                    <h4>Resultados</h4>
                    <hr />
                    {
                        (q === '')
                            ? <div className="alert alert-info">Buscar un Heroe</div>
                            : (heroesFiltered.length === 0) 
                                && <div className=" alert alert-danger">No se ha encontrado ningun Heroe</div>
                    }

                    {
                        heroesFiltered.map(hero => (
                            <HeroCard 
                                key={hero.id}
                                {...hero}
                            />
                        ))
                    }
                </div>
            </div>
        </>
    )
}
