import React, { FC } from 'react';
import { arrayToString } from '../../../utils/arrayToString.helper';
import { getMovieDirectors } from '../../../utils/getMovieDirectors.helper';
import { toCurrency } from '../../../utils/toCurrency.helper';
import { Details } from '../../../types/Details';
import { Credits } from '../../../types/Credits';
import { ContentNames } from '../../../types/ContentNames';
import UiInfoHeader from '../../ui/imfo-header/UiInfoHeader';

interface Props {
  details: Details.RootObject;
  credits: Credits.RootObject;
  mediaType?: string;
}

const DetailsHeader: FC<Props> = ({ details, credits, mediaType }) => {
  const release = new Date(
    `${details?.release_date || details?.first_air_date}`
  ).toLocaleDateString();

  return (
    <UiInfoHeader
      original_title={details.original_title || details.original_name}
      title={details.title || details.name}
      image={details.poster_path}
      favoriteData={{
        media_type: mediaType,
        id: details.id,
      }}
    >
      {details.production_countries && (
        <li>
          Страна производства:
          <span> {arrayToString(details.production_countries, 'name')}</span>
        </li>
      )}
      {mediaType === ContentNames.Movie && (
        <li>
          Режиссёр: <span>{arrayToString(getMovieDirectors(credits.crew), 'name')}</span>
        </li>
      )}
      {details.created_by && details.created_by.length > 1 && (
        <li>
          Создатель(и): <span>{arrayToString(details.created_by, 'name')}</span>
        </li>
      )}
      {details.production_companies && (
        <li>
          Кинокомпании: <span>{arrayToString(details.production_companies, 'name')}</span>
        </li>
      )}

      {details.genres && (
        <li>
          Жанр: <span>{arrayToString(details.genres, 'name')}</span>
        </li>
      )}

      {details?.budget > 0 && (
        <li>
          Бюджет: <span>{toCurrency(details.budget, 'USD')}</span>
        </li>
      )}
      <li>
        Дата выхода: <span>{release}</span>
      </li>
      {mediaType === ContentNames.Series && (
        <>
          <li>
            Дата выхода последнего эпизода:{' '}
            <span>{new Date(details.last_air_date).toLocaleDateString()}</span>
          </li>
          {details.next_episode_to_air && (
            <li>
              Дата выхода следующего эпизода:{' '}
              <span>{new Date(details.next_episode_to_air.air_date).toLocaleDateString()}</span>
            </li>
          )}
          <li>
            Статус сериала: <span>{details.in_production ? 'В производстве' : 'Завершён'}</span>
          </li>
          <li>
            Количество сезонов: <span>{details.number_of_seasons}</span>
          </li>
          <li>
            Количество серий: <span>{details.number_of_episodes}</span>
          </li>
        </>
      )}
      {(details.runtime || details.episode_run_time) && (
        <li>
          {details.episode_run_time ? 'Длительность серий: ' : 'Длительность: '}
          <span>{details.runtime || arrayToString(details.episode_run_time)} мин.</span>
        </li>
      )}
    </UiInfoHeader>
  );
};

export default DetailsHeader;
