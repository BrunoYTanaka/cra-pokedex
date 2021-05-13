import React, { useState } from 'react'
import { ImSpinner9 } from 'react-icons/im'
import { GrStatusWarning } from 'react-icons/gr'
import { BsArrowLeftShort } from 'react-icons/bs'
import { IoIosArrowForward, IoIosArrowBack } from 'react-icons/io'
import { useHistory } from 'react-router-dom'
import { StatsType, ImgType } from '../../pages/Pokemon'
import styles from './styles.module.css'

interface InfoProps {
  notFounded: boolean
  loading: boolean
  frontImg: ImgType
  backImg: ImgType
  id: number
  name: string
  base_experience: number
  stats: StatsType
  height: number
  weight: number
  abilities: string
  types: string
}

const Info: React.FC<InfoProps> = ({
  backImg,
  frontImg,
  loading,
  notFounded,
  id,
  base_experience,
  name,
  stats,
  abilities,
  height,
  types,
  weight,
}) => {
  const [selected, setSelected] = useState(0)
  const [isFrontImg, setIsFrontImg] = useState(true)
  const handleClick = (value: number) => setSelected(value)
  const handleImg = (value: boolean) => setIsFrontImg(value)
  const history = useHistory()

  const handleBack = () => {
    history.goBack()
  }

  const Content = () => {
    if (notFounded) {
      return (
        <div className={styles.notFound}>
          <GrStatusWarning size={36} />
          Pokemon não encontrado
        </div>
      )
    }
    return (
      <div className={styles.containerInfo}>
        <div className={styles.content}>
          <button type="button" onClick={handleBack}>
            <BsArrowLeftShort size={36} />
          </button>
          <span>#{id?.toString().padStart(4, '0')}</span>
        </div>
        <div className={styles.imgContainer}>
          <button type="button" onClick={() => handleImg(true)}>
            <IoIosArrowBack size={24} />
          </button>
          <img
            loading="lazy"
            src={isFrontImg ? frontImg.url : backImg.url}
            alt={isFrontImg ? frontImg.name : backImg.name}
          />
          <button type="button" onClick={() => handleImg(false)}>
            <IoIosArrowForward size={24} />
          </button>
        </div>
        <section className={styles.info}>
          <button
            type="button"
            onClick={() => handleClick(0)}
            className={selected === 0 ? styles.selected : ''}
          >
            Sobre
          </button>
          <button
            type="button"
            onClick={() => handleClick(1)}
            className={selected === 1 ? styles.selected : ''}
          >
            Base status
          </button>
        </section>
        <section className={styles.divider} />
        {selected === 0 && (
          <section className={styles.about}>
            <table cellPadding={0}>
              <tbody>
                <tr>
                  <th>Nome</th>
                  <td style={{ textTransform: 'capitalize' }}>{name}</td>
                </tr>
                <tr>
                  <th>Base de xp</th>
                  <td>{base_experience} xp</td>
                </tr>
                <tr>
                  <th>Altura</th>
                  <td>{height} cm</td>
                </tr>
                <tr>
                  <th>Peso</th>
                  <td>{weight / 10} kg</td>
                </tr>
                <tr>
                  <th>Habilidade(s)</th>
                  <td style={{ textTransform: 'capitalize' }}>{abilities}</td>
                </tr>
                <tr>
                  <th>Tipo(s)</th>
                  <td style={{ textTransform: 'capitalize' }}>{types}</td>
                </tr>
              </tbody>
            </table>
          </section>
        )}
        {selected === 1 && (
          <section className={styles.about}>
            <table cellPadding={0}>
              <tbody>
                <tr>
                  <th>HP</th>
                  <td>{stats.hp}</td>
                </tr>
                <tr>
                  <th>Attack</th>
                  <td>{stats.attack}</td>
                </tr>
                <tr>
                  <th>Defense</th>
                  <td>{stats.defense}</td>
                </tr>
                <tr>
                  <th>Sp. Atk</th>
                  <td>{stats['special-attack']}</td>
                </tr>
                <tr>
                  <th>Sp. Def</th>
                  <td>{stats['special-defense']}</td>
                </tr>
                <tr>
                  <th>Speed</th>
                  <td>{stats.speed}</td>
                </tr>
              </tbody>
            </table>
          </section>
        )}
      </div>
    )
  }

  return (
    <>
      {loading ? (
        <div className={styles.loading}>
          <ImSpinner9 size={36} className={styles.spinner} />
        </div>
      ) : (
        <Content />
      )}
    </>
  )
}

export default Info
