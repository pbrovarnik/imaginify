import { redirect } from 'next/navigation';

import { Collection } from '@/components/shared/collection';
import Header from '@/components/shared/header';
import { auth } from '@clerk/nextjs/server';
import { getUserById } from '@/lib/actions/user.actions';
import { getUserImages } from '@/lib/actions/image.actions';
import { Coins, Images } from 'lucide-react';

const Profile = async ({ searchParams }: SearchParamProps) => {
	const page = Number(searchParams?.page) || 1;
	const { userId } = auth();

	if (!userId) redirect('/sign-in');

	const user = await getUserById(userId);
	const images = await getUserImages({ page, userId: user._id });

	return (
		<>
			<Header title="Profile" />

			<section className="profile">
				<div className="profile-balance">
					<p className="p-14-medium md:p-16-medium">CREDITS AVAILABLE</p>
					<div className="mt-4 flex items-center gap-4">
						<Coins className="size-9 md:size-12 text-amber-400" />
						<h2 className="h2-bold text-foreground">{user.creditBalance}</h2>
					</div>
				</div>

				<div className="profile-image-manipulation">
					<p className="p-14-medium md:p-16-medium">IMAGE MANIPULATION DONE</p>
					<div className="mt-4 flex items-center gap-4">
						<Images className="size-9 md:size-12" />
						<h2 className="h2-bold text-foreground">{images?.data.length}</h2>
					</div>
				</div>
			</section>

			<section className="mt-8 md:mt-14">
				<Collection images={images?.data} totalPages={images?.totalPages} page={page} />
			</section>
		</>
	);
};

export default Profile;
