import React, { useContext } from 'react'
import bemCssModules from 'bem-css-modules'
import { useNavigate } from 'react-router-dom'
import { default as CourseStyles } from './Course.module.scss'
import request from '../../helpers/request'
import { StoreContext } from '../../store/StoreProvider'

const style = bemCssModules(CourseStyles)

const Course = ({ authors, id, img, isUserContext, price, title }) => {
    const { user, setUser } = useContext(StoreContext)
    const navigate = useNavigate

    const allAuthors = authors.join(', ');
    const isUserLogged = Boolean(user)

    const handleOnClick = async () => {
        try {
            const { data, status } = await request.patch(
                '/users',
                {
                    login: user.login,
                    courseId: id,
                }
            )

            if (status === 202) {
                setUser(data.user)
                navigate('/my-courses')
            }
        } catch (error) {
            console.warn(error);
        }
    }

    const shouldBeBuyButtonVisible = isUserLogged && !isUserContext

    return (
        <li>
            <article className={style()}>
                <h3 className={style('title')}></h3>
                <img alt={title} className={style('image')} src={img} />
                <p className={style('price')}>{`Koszt kursu: ${price} zł`}</p>
                <p className={style('uthors')}>{`Autorzy kursu: ${allAuthors} zł`}</p>
                {shouldBeBuyButtonVisible && <button onClick={handleOnClick}>Zakup ten kurs</button>}
            </article>
        </li>
    )
}

export default Course