import { useContext } from 'react'
import { GameContext } from '../context/GameContext'

export default function useGameContext() {
  const { game, setGame, user, setUser } = useContext(GameContext)
  return { game, setGame, user, setUser }
}