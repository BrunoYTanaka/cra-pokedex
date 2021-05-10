import React, { useState } from 'react'
import styles from './styles.module.css'

const Info: React.FC = () => {
  const [selected, setSelected] = useState(0)
  const [currentImg, setCurrentImg] = useState(
    'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png',
  )
  const handleClick = (value: number) => setSelected(value)

  const handleMouse = (enter: boolean) => {
    if (enter) {
      setCurrentImg(
        'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/1.png',
      )
    } else {
      setCurrentImg(
        'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png',
      )
    }
  }

  return (
    <div className={styles.containerInfo}>
      <div className={styles.content}>
        <h1>Bulbasaur</h1>
        <span>#001</span>
      </div>
      <div
        onMouseEnter={() => handleMouse(true)}
        onMouseLeave={() => handleMouse(false)}
      >
        <img loading="lazy" src={currentImg} alt="bulbasaur" />
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
                <th>Espécie</th>
                <td>Seed</td>
              </tr>
              <tr>
                <th>Altura</th>
                <td>0.7cm</td>
              </tr>
              <tr>
                <th>Peso</th>
                <td>6.9kg</td>
              </tr>
              <tr>
                <th>Habilidade(s)</th>
                <td>Overgrow, Chlorophyl</td>
              </tr>
              <tr>
                <th>Tipo(s)</th>
                <td>Grass, Poison</td>
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
                <td>45</td>
              </tr>
              <tr>
                <th>Attack</th>
                <td>49</td>
              </tr>
              <tr>
                <th>Defense</th>
                <td>49</td>
              </tr>
              <tr>
                <th>Sp. Atk</th>
                <td>65</td>
              </tr>
              <tr>
                <th>Sp. Def</th>
                <td>65</td>
              </tr>
              <tr>
                <th>Speed</th>
                <td>45</td>
              </tr>
            </tbody>
          </table>
        </section>
      )}
    </div>
  )
}

export default Info
