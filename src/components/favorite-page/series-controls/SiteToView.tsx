import React, { FC } from 'react';
import styles from './site-to-view.module.scss';
import useTranslation from 'next-translate/useTranslation';
import { FavoriteList } from '@/types/FavoriteList';
import { useSitesToView } from '@/hooks/useSitesToView';
import { AddIcon, CheckMarkIcon, CloseIcon, EditIcon } from '@/components/ui/Icons';

interface Props {
  favoriteItem: FavoriteList.RootObject;
}

const SiteToView: FC<Props> = ({ favoriteItem }) => {
  const { sitesToView, startEdit, isEdit, editUrlIndex, editUrlValue, confirmlEdit, cancelEdit, setEditUrlValue } = useSitesToView(favoriteItem);
  const { t } = useTranslation('favoritePage');

  return (
    <div className={styles['content']}>
      {sitesToView &&
        sitesToView.map((item, index) => (
          <div key={`site-${index}`} className={styles['item']} style={{ '--order': index + 1 } as React.CSSProperties}>
            <a href={item.url} target="_blank" rel="noreferrer">
              {t('tracking_menu.site_to_view')} #{index + 1}
            </a>
            <button className={styles['start_edit_btn']} onClick={() => startEdit(index + 1, item.url)}>
              <EditIcon />
            </button>
          </div>
        ))}

      {!isEdit && (
        <div
          className={`${styles['add_new']} ${styles['item']}`}
          onClick={() => startEdit(null, '')}
          style={{ '--order': sitesToView?.length || 1 } as React.CSSProperties}
        >
          <button>{t('tracking_menu.add_site_to_view')}</button>
          <AddIcon />
        </div>
      )}

      {isEdit && (
        <div className={`${styles['edit']} ${styles['item']}`} style={{ '--order': editUrlIndex || sitesToView?.length || 1 } as React.CSSProperties}>
          <input
            type="text"
            value={editUrlValue}
            onChange={(event) => setEditUrlValue(event.target.value)}
            placeholder={t('tracking_menu.site_to_view_input')}
          />
          <button onClick={() => confirmlEdit()}>
            <CheckMarkIcon />
          </button>
          <button onClick={() => cancelEdit()}>
            <CloseIcon />
          </button>
        </div>
      )}
    </div>
  );
};

export default SiteToView;
