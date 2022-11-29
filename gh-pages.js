import ghpages from 'gh-pages';

ghpages.publish(
	'public', // path to public directory
	{
		branch: 'gh-pages',
		repo: 'https://github.com/andorra-ri/enquesta-sismica', // Update to point to your repository

		src: ['**/*', '.nojekyll']
	},
	() => {
		console.log('Deploy Complete!');
	}
);