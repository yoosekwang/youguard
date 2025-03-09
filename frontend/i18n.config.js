import axios from 'axios';
import en from './i18n/en.json'
import ko from './i18n/ko.json'

export default defineI18nConfig(async () => {

    let translations = null;

    try{
        const res = await axios.get("http://localhost:5000/api/translations");
        translations = res.data;
        if(Object.keys(translations.en) <= 0){
            translations = {
                en: en,
                ko: ko
            }  
        }
    }catch(err){
        translations = {
            en: en,
            ko: ko
        }    
    }

    return {
        legacy: false,
        locale: 'en',
        defaultLocale: 'en',
        locales: ['en', 'ko'],
        lazy: true,
        messages: translations
    };
})
  