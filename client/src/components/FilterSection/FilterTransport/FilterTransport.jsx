import React from 'react';

import "../FilterSection.css";

class FilterTransport extends React.Component {

    state = {
        button: ""
    }

    resetFilter = () => {
        this.props.resetFilterTransportation();
        this.props.getTransportations();
    }

    handleClick = (button) => {
        this.setState({button})
    }


    onSubmit = (e) => {
        e.preventDefault();
        if (this.state.button === "reset") {
            this.resetFilter();
        }
        if (this.state.button === "show") {
            this.props.getFilteredTransportations();
        }
    }

    render() {
        let {
            filteredTransportations, editTransportationFilterHandler, regions, editPlaceSelectionHandler
        } = this.props;
        let {button} = this.state;

        return (
            <form className="filter__form" onSubmit={this.onSubmit}>
                <div className="filter__direction">
                    <p className="filter__title">Откуда</p>
                    <div className="filter__direction-from">
                        <div className="filter-direction-area">
                            <select value={filteredTransportations.from_region}
                                    onChange={(e) => editPlaceSelectionHandler(e.target.name, e.target.value)}
                                    className="filter__direction-selection" name="from_region">
                                <option value="">Область</option>
                                {regions.results.map(region => (
                                    <option key={region.id} value={region.id}>{region.name}</option>
                                ))}
                            </select>
                        </div>
                        <div className="filter__direction-city">
                            <select value={filteredTransportations.from_city}
                                    onChange={(e) => editPlaceSelectionHandler(e.target.name, e.target.value)}
                                    className="filter__direction-selection" name="from_city">
                                <option value="">Город, район</option>
                                {regions.results.filter(region => region.id === parseInt(filteredTransportations.from_region)).map(region => (
                                    region.cities.map(city => (
                                        <option key={city.id} value={city.id}>{city.name}</option>
                                    ))
                                ))}
                            </select>
                        </div>
                    </div>

                    <p className="filter__title">Куда</p>
                    <div className="filter__direction-to">
                        <div className="filter-direction-area">
                            <select value={filteredTransportations.to_region}
                                    onChange={(e) => editPlaceSelectionHandler(e.target.name, e.target.value)}
                                    className="filter__direction-selection" name="to_region">
                                <option value="">Область</option>
                                {regions.results.map(region => (
                                    <option key={region.id} value={region.id}>{region.name}</option>
                                ))}
                            </select>
                        </div>
                        <div className="filter__direction-city">
                            <select value={filteredTransportations.to_city}
                                    onChange={(e) => editPlaceSelectionHandler(e.target.name, e.target.value)}
                                    className="filter__direction-selection" name="to_city">
                                <option value="">Город, район</option>
                                {regions.results.filter(region => region.id === parseInt(filteredTransportations.to_region)).map(region => (
                                    region.cities.map(city => (
                                        <option key={city.id} value={city.id}>{city.name}</option>
                                    ))
                                ))}
                            </select>
                        </div>
                    </div>
                </div>
                {/*Filter Direction*/}

                <div className="filter-size">
                    <div className="filter__size-information">

                        <div className="filter-weight">
                            <p className="filter__title">Вес груза, т</p>
                            <div className="filter__size-from">
                                <div className="filter-direction-size">
                                    <input className="filter__size-selection"
                                           type="number"
                                           required={filteredTransportations.to_weight !== "" && button === "show"}
                                           min="0"
                                           name="from_weight"
                                           placeholder="От"
                                           value={filteredTransportations.from_weight}
                                           onChange={(e) => editTransportationFilterHandler(e.target.name, e.target.value)}
                                    />
                                </div>
                                <div className="filter-direction-size">
                                    <input className="filter__size-selection"
                                           type="number"
                                           required={filteredTransportations.from_weight !== "" && button === "show"}
                                           min="0"
                                           name="to_weight"
                                           placeholder="До"
                                           value={filteredTransportations.to_weight}
                                           onChange={(e) => editTransportationFilterHandler(e.target.name, e.target.value)}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="filter__price">
                            <div className="filter__size-to">
                                <div className="filter-direction-size">
                                    <input className="filter__size-selection filter__price-selection"
                                           name="from_price"
                                           required={filteredTransportations.to_price !== "" && button === "show"}
                                           type="number"
                                           min="0"
                                           value={filteredTransportations.from_price}
                                           onChange={(e) => editTransportationFilterHandler(e.target.name, e.target.value)}
                                           placeholder="Цена от, сом"
                                    />
                                </div>
                                <div className="filter-direction-size">
                                    <input className="filter__size-selection filter__price-selection"
                                           name="to_price"
                                           required={filteredTransportations.from_price !== "" && button === "show"}
                                           type="number"
                                           min="0"
                                           value={filteredTransportations.to_price}
                                           onChange={(e) => editTransportationFilterHandler(e.target.name, e.target.value)}
                                           placeholder="До"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/*Filter size*/}



                <div className="filter__buttons">
                    <div className="filter-reset">
                        <button className="filter__reset-btn" onClick={() => this.handleClick("reset")}>Сбросить <i
                            className="fa fa-close"/></button>
                    </div>
                    <div className="filter-show">
                        <button className="filter__show-btn" onClick={() => this.handleClick("show")}>Показать
                            объявления
                        </button>
                    </div>
                </div>
            </form>
        );
    }
}

export default FilterTransport;