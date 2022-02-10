import React, { useContext, useState } from 'react';
import request from '../../../helpers/request';
import { StoreContext } from '../../../store/StoreProvider';
import CoursePopup from './CoursePopup';

const CourseDetalis = (props) => {
    const [isOpenPopup, setIsOpenPopup] = useState(false)
    const { setCourses } = useContext(StoreContext)
    const { title, id } = props;
    const showPopup = () => setIsOpenPopup(true)
    const hidePopup = event => {
        event.preventDefault();
        setIsOpenPopup(false)
    }

    const handleDelateCourse = async () => {
        try {
            const { status } = await request.delete(`/courses/${id}`)

            if (status === 200) {
                setCourses(prev => prev.filter(course => course.id !== id))
            }
        } catch (error) {
            console.warn(error)
        }
    }

    return (
        <details>
            <summary>{title}</summary>
            <button onClick={showPopup}>Edytuj</button>
            <button onClick={handleDelateCourse}>Usuń</button>
            <CoursePopup isOpenPopup={isOpenPopup} hidePopup={hidePopup} {...props} />
        </details>
    );
};

export default CourseDetalis;