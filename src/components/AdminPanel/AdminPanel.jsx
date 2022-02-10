import React, { useContext, useState } from 'react';
import { StoreContext } from '../../store/StoreProvider';
import CourseDetalis from './subcomponents/CourseDetalis';
import CoursePopup from './subcomponents/CoursePopup';

const AdminPanel = () => {
    const { courses } = useContext(StoreContext)
    const [isOpenPopup, setIsOpenPopup] = useState(false)
    const coursesElements = courses.map(course => <CourseDetalis key={course.id} {...course} />)

    const showPopup = () => setIsOpenPopup(true)
    const hidePopup = event => {
        event.preventDefault();
        setIsOpenPopup(false)
    }

    return (
        <section>
            {coursesElements}
            <button onClick={showPopup}>Dodaj nowy kurs</button>
            <CoursePopup isEditMode={false} isOpenPopup={isOpenPopup} hidePopup={hidePopup} />
        </section>
    );
};

export default AdminPanel;