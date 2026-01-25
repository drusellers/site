import { NextRequest, NextResponse } from "next/server";
import { getPostData } from "@/lib/cms.posts";

type Props = {
	params: Promise<{ id: string }>;
};

export async function GET(request: NextRequest, { params }: Props) {
	const id = (await params).id;
	const postData = await getPostData(id);

	// This supports slugs like "about.txt"
	if (postData) {
		return new NextResponse(postData.contentPlain, {
			headers: { "Content-Type": "text/plain" },
		});
	}

	return new NextResponse("Not found", { status: 404 });
}
