import React from 'react';

const bookingList = props => (
    <ul>
        {props.bookings.map(booking =>{
            return <li>
            <div>
            {booking.event.title} - {' '}
            {new Date(booking.createdAt).toLocaleDateString()}
            </div>
            </li>
        })}
    </ul>
);

export default bookingList;