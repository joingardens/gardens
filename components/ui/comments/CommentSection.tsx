import CommentsList from './CommentsList';
import NewCommentForm from './NewCommentForm';
import { useComments } from '../../../utils/use-comments';
import { CommentType } from '../../../utils/types';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';

dayjs.extend(relativeTime, {
  rounding: Math.floor,
});
dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.tz.setDefault(dayjs.tz.guess());

interface Props {
  initialData?: CommentType | null;
}

const CommentSection = ({ initialData = null }: Props): JSX.Element => {
  const { count } = useComments();

  return (
    <>
      <div className="flex-none flex flex-row items-center justify-between py-3 sm:py-4 px-3 sm:px-6 order-first">
        <h2 className="text-xl font-semibold dark:text-gray-100">
          Responses {count && <span>({count})</span>}
        </h2>
      </div>

      <div className="flex border-t border-gray-200 dark:border-gray-600 px-3 sm:px-6">
        <NewCommentForm />
      </div>

      <div className="flex-grow flex flex-col overflow-hidden">
        <CommentsList initialData={initialData} useInfiniteScroll={false} />
      </div>
    </>
  );
};

export default CommentSection;