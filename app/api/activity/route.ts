import { NextRequest, NextResponse } from 'next/server';
// @ts-ignore - learnosity-sdk-nodejs doesn't have TypeScript definitions
import Learnosity from 'learnosity-sdk-nodejs';
import config from '@/lib/config';
import type { AuthorAPIRequest, AuthorAPIResponse } from '@/lib/types';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const activityId = searchParams.get('id');

    if (!activityId) {
      return NextResponse.json(
        { error: 'Activity ID is required' },
        { status: 400 }
      );
    }

    const authorRequest: AuthorAPIRequest = {
      mode: 'activity_edit',
      reference: activityId,
      user: {
        id: config.user.id,
        firstname: config.user.firstname,
        lastname: config.user.lastname,
        email: config.user.email,
      },
    };

    const learnositySDK = new Learnosity();
    const initOptions = learnositySDK.init(
      'author',
      {
        consumer_key: config.consumerKey,
        domain: config.domain,
      },
      config.consumerSecret,
      authorRequest
    );

    const response: AuthorAPIResponse = {
      security: JSON.stringify(initOptions.security),
      request: JSON.stringify(initOptions.request),
      endpoint: config.authorApiUrl,
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error('Error initializing Author API:', error);
    return NextResponse.json(
      { error: 'Failed to initialize Author API' },
      { status: 500 }
    );
  }
}
