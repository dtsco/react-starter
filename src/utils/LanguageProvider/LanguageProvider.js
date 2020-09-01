import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ConfigProvider } from 'antd';
import get from 'lodash/get';
import { useSelector } from 'react-redux';
import moment from 'moment';
import ru_RU from 'antd/es/locale/ru_RU';
import en_US from 'antd/es/locale/en_US';
import 'moment/locale/ru';
import 'moment/locale/en-gb';


function LanguageProvider({ children }) {
  const { i18n } = useTranslation();
  const currentLang = useSelector((state) =>
    get(state, `fetch.me.dataSource.language`, 'en'),
  );
  const [lang, setLang] = useState(en_US);
  useEffect(() => {
    if (currentLang === 'ru') {
      setLang(ru_RU);
    } else {
      setLang(en_US);
    }
  }, [currentLang]);

  return <ConfigProvider locale={lang}>{children}</ConfigProvider>;
}

export default LanguageProvider;
