import { useEffect, useState } from 'react';
import CommentSection from './ui/comments/CommentSection';
import { CommentsContextProvider } from '../utils/use-comments';
import { ModalProvider } from '../utils/use-modal';

export const Comments = (props) => {

	//console.log(props.postId)

	return (

	/* Native Supabase version,
	Courtesy Lawrence Chen https://github.com/lawrencecchen/threaded-comments */

	 <CommentsContextProvider postId={props.postId}>
        <ModalProvider>
          <div className="min-w-full dark:bg-gray-800 transition-all">
            <div className="max-w-prose mx-auto flex-grow">
              <CommentSection />
            </div>
          </div>
        </ModalProvider>
      </CommentsContextProvider>

      )

	/* Utterances version, 
	Courtesy Dhanraj Padmashali https://dhanrajsp.me/blog/adding-comments-to-my-blog

	const commentNodeId = 'comments';

	const [visible, setVisible] = useState(false);

	useEffect(() => {
		if (!visible) return;
		// docs - https://utteranc.es/
		const script = document.createElement('script');
		script.src = 'https://utteranc.es/client.js';
		script.async = true;
		script.setAttribute('repo', 'openworkwiki/Open-Work');
		script.setAttribute('issue-term', 'title');
		script.setAttribute('label', '[Auto]');
		script.setAttribute('theme', 'github-light');
		script.setAttribute('crossorigin', 'anonymous');

		const scriptParentNode = document.getElementById(commentNodeId);
		scriptParentNode.appendChild(script);

		return () => {
			// cleanup - remove the older script with previous theme
			scriptParentNode.removeChild(scriptParentNode.firstChild);
		};
	}, [visible]);

	useEffect(() => {
		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						setVisible(true);
					}
				});
			},
			{
				threshold: 1,
			}
		);
		observer.observe(document.getElementById(commentNodeId));
	}, [commentNodeId]);

	return <div id={commentNodeId} className="lg:w-4/5 mt-6 mb-24 px-5" />;
	*/
};