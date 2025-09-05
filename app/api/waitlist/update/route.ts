import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json()
    const { waitlistId, ...updateData } = body
    
    if (!waitlistId) {
      return NextResponse.json(
        { success: false, error: 'Waitlist ID is required' },
        { status: 400 }
      )
    }

    // Update the existing waitlist entry with all fields
    const { data, error } = await supabase
      .from('waitlist')
      .update({
        description: updateData.description,
        heard_about: updateData.heardAbout,
        other_source: updateData.otherSource,
        social_handle_instagram: updateData.socialHandleInstagram,
        social_handle_tiktok: updateData.socialHandleTiktok,
        social_handle_twitter: updateData.socialHandleTwitter,
        social_handle_youtube: updateData.socialHandleYoutube,
        follower_count_range: updateData.followerCountRange,
        content_niche: updateData.contentNiche,
        collaboration_interests: updateData.collaborationInterests,
        form_completed: updateData.formCompleted || true
      })
      .eq('id', waitlistId)
      .select()

    if (error) {
      console.error('Supabase update error:', error)
      return NextResponse.json(
        { success: false, error: 'Failed to update waitlist entry' },
        { status: 500 }
      )
    }

    return NextResponse.json({ 
      success: true, 
      message: 'Waitlist entry updated successfully',
      data 
    })

  } catch (error) {
    console.error('Error updating waitlist entry:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to update waitlist entry' },
      { status: 500 }
    )
  }
}