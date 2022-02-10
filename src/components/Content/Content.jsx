import React, { useContext } from 'react';
import bemCssModules from 'bem-css-modules';
import { StoreContext } from '../../store/StoreProvider';
import Courses from '../Courses/Courses';
import UserCourses from '../UserCourses/UserCourses';
import { default as ContentStyles } from './Content.module.scss';
import { Routes, Route } from 'react-router-dom';

const style = bemCssModules(ContentStyles);

const ADMIN_TYPE = 1;

const Content = () => {
    const { user } = useContext(StoreContext);

    const isUserLogged = Boolean(user);
    const isAdmin = user?.accessLevel === ADMIN_TYPE;

    return (
        <main className={style()}>
            <Routes>
                <Route path='/' render={() => <Courses />} />
                {isUserLogged && <Route path='/my-courses' render={() => <UserCourses />} />}
                {isAdmin && <Route path='/my-courses' render={() => <p>Zarządzanie kursami</p>} />}
            </Routes>
        </main>
    )
}

export default Content