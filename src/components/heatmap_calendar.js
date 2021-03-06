import React from "react";
import CalendarHeatmap from 'react-calendar-heatmap';
import ReactTooltip from 'react-tooltip'

const today = new Date();

const shiftDate = (date, numDays) => {
    const newDate = new Date(date);
    newDate.setDate(newDate.getDate() + numDays);
    return newDate;
};

export default (props) => {
    setTimeout(ReactTooltip.rebuild);
    if ( !props.dateCounts ) {
        return (<p className='loading_text'>Loading...</p>)
    }
    return (
        <>
        <CalendarHeatmap
            key={props.key}
            startDate={shiftDate(today, -120)}
            endDate={today}
            values={props.dateCounts}
            classForValue={(value) => {
                if (!value) {
                    return 'color-empty';
                }
                return `color-scale-${value.count}`;
            }}
            tooltipDataAttrs={(value) => {return {
                'data-tip': props.tooltipChoice ===  'count' ? value.count : value.max
            }}}
            showWeekdayLabels={true}
        />
        <ReactTooltip place="top" type="light" effect="float" />
        </>
    )
}