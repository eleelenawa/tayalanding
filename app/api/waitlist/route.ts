import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Insert into Supabase
    const { data, error } = await supabase
      .from('waitlist')
      .insert([
        {
          first_name: body.firstName,
          last_name: body.lastName,
          email: body.email,
          description: body.description,
          content_creator: body.contentCreator,
          heard_about: body.heardAbout || null,
          other_source: body.otherSource || null,
          form_completed: false
        }
      ])
      .select() // Return the created record

    if (error) {
      console.error('Supabase error:', error)
      return NextResponse.json(
        { success: false, error: 'Failed to submit to waitlist' },
        { status: 500 }
      )
    }

    return NextResponse.json({ 
      success: true, 
      message: 'Successfully submitted to waitlist',
      data 
    })

  } catch (error) {
    console.error('Error submitting to waitlist:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to submit to waitlist' },
      { status: 500 }
    )
  }
}