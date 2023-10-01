// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  languages: Object
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {

    const headers = new Headers()

    headers.set('X-RapidAPI-Key', process.env.X_JUDGE_KEY || '')
    headers.set('X-RapidAPI-Host', process.env.X_JUDGE_Host || '')

    fetch('https://judge0-ce.p.rapidapi.com/languages', {
        headers: headers,
        mode: 'cors'
    }).then((res) => res.json()).then((data: any) => {
        res.status(200).json({ languages: data })
    })

}
