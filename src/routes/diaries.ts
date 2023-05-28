import express from 'express'
import * as diary from '../services/diary'
import toNewDiaryEntry from '../utils/verificationDiaryEntry'

const router = express.Router()

router.get('/', (req, res) => {
  const { key } = req.query

  if (key === 'pepe') {
    res.json(diary.getEntries())
    return
  }

  res.json(diary.getEntriesWithoutSensitiveInfo())
})

router.get('/:id', (req, res) => {
  const { id } = req.params

  const entry = diary.findById(+id)

  console.log(entry)

  return entry !== null ? res.json(entry) : res.sendStatus(404)
})

router.post('/', (req, res) => {
  try {
    const NewDiaryEntry = toNewDiaryEntry(req.body)

    const addedDiaryEntry = diary.addDiary(NewDiaryEntry)

    res.json(addedDiaryEntry)
  } catch (e: any) {
    res.status(400).send(e.message)
  }
})

export default router
