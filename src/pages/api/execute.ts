// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import sleep from '@/helpers/sleep'
import type { NextApiRequest, NextApiResponse } from 'next'
import { useSearchParams } from 'next/navigation'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {

    const headers = new Headers()

    headers.set('content-type', 'application/json')
    headers.set('Content-Type', 'application/json')
    headers.set('X-RapidAPI-Key', process.env.X_JUDGE_KEY || '')
    headers.set('X-RapidAPI-Host', process.env.X_JUDGE_Host || '')

    const { language_id, source_code, stdin } = req.query

    console.log(language_id, source_code, stdin)

    let results = await fetch(`https://judge0-ce.p.rapidapi.com/submissions?base64_encoded=true&fields=*&wait=true`, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify({
            language_id: language_id,
            source_code: source_code,
            stdin: stdin
        })
    })
    results = await results.json()

    console.log(results)

    res.status(200).json({ results: results })

}
