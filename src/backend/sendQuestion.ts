import {questionProps} from '../inrerfaces.ts'

export async function postData(url: string, data: questionProps): Promise<T> {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8'
      },
      body: JSON.stringify(data) 
    });

    return response.json();
}



