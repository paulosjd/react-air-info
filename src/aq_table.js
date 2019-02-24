import React, { Component } from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
import SearchBar from './components/search_bar'
import SiteTable from './components/site_table'
import AirChart from './components/air_chart'

class FilterableSiteTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            filterText: '',
            siteRegion: '',
            siteCategory: '',
            highFilter: '',
            townSearch: '',
            siteCode: 'MY1'
        };
    }

    handleFilterInput(val, field) {
        let resetRegion = false;
        this.resetRadioFilters();
        switch (field) {
            case ('category'):
                this.setState({
                    siteCategory: val,
                }); break;
            case ('high_filter'):
                this.setState({
                    highFilter: val,
                }); break;
            case ('text_filter'):
                resetRegion = true;
                this.setState({
                    filterText: val,
                }); break;
            case ('region'):
                this.setState({
                    siteRegion: val
                }); break;
            default:
                console.log('no condition met')
        }
        if (resetRegion) {
            this.resetRegion()
        }
    }
    resetTextInput() {
        this.setState({filterText: '',})
    }
    resetRegion() {
        this.setState({siteRegion: '',})
    }
    resetRadioFilters() {
        this.setState({
            siteCategory: '',
            highFilter: ''
        })
    }

    render() {
        for (let a of this.props.sites){console.log(a.name + ' ' + a.pm10)}
        return (
            <div>
                <Grid>
                <Row>
                <Col md={3}>
                <SiteTable
                    sites={this.props.sites.filter(site => site.pm10)}
                    time={this.props.time}
                    filterText={this.state.filterText}
                    highFilter={this.state.highFilter}
                    siteRegion={this.state.siteRegion}
                    siteCategory={this.state.siteCategory}
                />
                </Col>
                <Col md={2}>
                    <SearchBar
                        filterText={this.state.filterText}
                        highFilter={this.state.highFilter}
                        siteCategory={this.state.siteCategory}
                        siteRegion={this.state.siteRegion}
                        resetRegion={this.resetRegion.bind(this)}
                        resetText={this.resetTextInput.bind(this)}
                        onFilterChange={this.handleFilterInput.bind(this)}
                        handleGeoCoordinatesSearch={this.props.handleGeoCoordinatesSearch}
                    />
                </Col>
                <Col md={7}>
                    <AirChart siteCode={this.state.siteCode}/>
                </Col>
                </Row>
                </Grid>
            </div>
        );
    }
}

export default FilterableSiteTable;