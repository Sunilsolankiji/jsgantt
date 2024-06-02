/* =========================================================
 * Created by Sunil Solanki
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ========================================================= */

(function (global) {
  let ZTGantt = function (element, options, templates) {
    this.element = element;
    this.initializeOptions(options);
    this.initTemplates(templates);

    this.handleFullScreenChangeSafari =
      this.handleFullScreenChangeSafari.bind(this);
    this.handleFullScreenChange = this.handleFullScreenChange.bind(this);
    this.handleResizeWindow = this.handleResizeWindow.bind(this);

    this.init();
  };

  ZTGantt.prototype = {
    constructor: ZTGantt,

    // initialize Options
    initializeOptions: function (opt) {
      if (opt == null) {
        opt = {};
      }
      this.options = {
        date_format: opt.date_format,
        columns: opt.columns || [],
        rightGrid: opt.rightGrid,
        data: opt.data || [],
        collapse: opt.collapse !== undefined ? opt.collapse : true,
        fullWeek: opt.fullWeek !== undefined ? opt.fullWeek : true,
        todayMarker: opt.todayMarker !== undefined ? opt.todayMarker : true,
        weekends: opt.weekends || [],
        startDate: opt.startDate,
        endDate: opt.endDate,
        zoomLevel: opt.zoomLevel || "day",
        zoomConfig: opt.zoomConfig || {
          levels: [{ unit: "day", step: 1, format: "%d" }],
        },
        scales: opt.scales || [{ unit: "day", step: 1, format: "%d" }],
        minColWidth: 80,
        openedTasks: [],
        selectedRow: "",
        weekStart: opt.weekStart || 1,
        scale_height: opt.scale_height || 30,
        row_height: opt.row_height || 50,
        sidebarWidth: opt.sidebarWidth || 400,
        customMarker: opt.customMarker || [],
        fullCell: opt.fullCell || true,
        taskColor: opt.taskColor || false,
        taskOpacity: opt.taskOpacity || 0.8,
        addLinks: opt.addLinks || false,
        exportApi: opt.exportApi,
        updateLinkOnDrag:
          opt.updateLinkOnDrag !== undefined ? opt.updateLinkOnDrag : true,
        splitTask: opt.splitTask || false,
        links: opt.links || [],
        arrangeData: true,
        selectAreaOnDrag: opt.selectAreaOnDrag || false,
        taskProgress: opt.taskProgress !== undefined ? opt.taskProgress : true,
        mouseScroll: opt.mouseScroll || false,
        ctrlKeyRequiredForMouseScroll:
          opt.ctrlKeyRequiredForMouseScroll !== undefined
            ? opt.ctrlKeyRequiredForMouseScroll
            : true,
        sort: opt.sort || false,
        dateFormat: {
          month_full: [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December",
          ],
          month_short: [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec",
          ],
          day_full: [
            "Sunday",
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
          ],
          day_short: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
        },
        i18n: {
          hi: {
            month_full: [
              "जनवरी",
              "फ़रवरी",
              "मार्च",
              "अप्रैल",
              "मई",
              "जून",
              "जुलाई",
              "अगस्त",
              "सितंबर",
              "अक्टूबर",
              "नवंबर",
              "दिसंबर",
            ],
            month_short: [
              "जनवरी",
              "फ़रवरी",
              "मार्च",
              "अप्रैल",
              "मई",
              "जून",
              "जुलाई",
              "अगस्त",
              "सितंबर",
              "अक्टूबर",
              "नवंबर",
              "दिसंबर",
            ],
            day_full: [
              "रविवार",
              "सोमवार",
              "मंगलवार",
              "बुधवार",
              "गुरुवार",
              "शुक्रवार",
              "शनिवार",
            ],
            day_short: ["रवि", "सोम", "मंगल", "बुध", "गुरु", "शुक्र", "शनि"],
            label: {
              description: "विवरण",
            },
            buttons: {
              save: "जमा करे",
              cancel: "रद्द करे",
              delete: "मिटाये",
            },
          },
          en: {
            month_full: [
              "January",
              "February",
              "March",
              "April",
              "May",
              "June",
              "July",
              "August",
              "September",
              "October",
              "November",
              "December",
            ],
            month_short: [
              "Jan",
              "Feb",
              "Mar",
              "Apr",
              "May",
              "Jun",
              "Jul",
              "Aug",
              "Sep",
              "Oct",
              "Nov",
              "Dec",
            ],
            day_full: [
              "Sunday",
              "Monday",
              "Tuesday",
              "Wednesday",
              "Thursday",
              "Friday",
              "Saturday",
            ],
            day_short: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
            label: {
              description: "Description",
            },
            buttons: {
              save: "Save",
              cancel: "Cancel",
              delete: "Delete",
            },
          },
          fr: {
            month_full: [
              "Janvier",
              "Février",
              "Mars",
              "Avril",
              "Mai",
              "Juin",
              "Juillet",
              "Août",
              "Septembre",
              "Octobre",
              "Novembre",
              "Décembre",
            ],
            month_short: [
              "Jan",
              "Fév",
              "Mar",
              "Avr",
              "Mai",
              "Juin",
              "Juil",
              "Aoû",
              "Sep",
              "Oct",
              "Nov",
              "Déc",
            ],
            day_full: [
              "Dimanche",
              "Lundi",
              "Mardi",
              "Mercredi",
              "Jeudi",
              "Vendredi",
              "Samedi",
            ],
            day_short: ["Dim", "Lun", "Mar", "Mer", "Jeu", "Ven", "Sam"],
            label: {
              description: "Description",
            },
            buttons: {
              save: "Sauvegarder",
              cancel: "Annuler",
              delete: "Effacer",
            },
          },
          de: {
            month_full: [
              "Januar",
              "Februar",
              "März ",
              "April",
              "Mai",
              "Juni",
              "Juli",
              "August",
              "September ",
              "Oktober",
              "November ",
              "Dezember",
            ],
            month_short: [
              "Jan",
              "Feb",
              "Mär",
              "Apr",
              "Mai",
              "Jun",
              "Jul",
              "Aug",
              "Sep",
              "Okt",
              "Nov",
              "Dez",
            ],
            day_full: [
              "Sonntag",
              "Montag",
              "Dienstag",
              "Mittwoch",
              "Donnerstag",
              "Freitag",
              "Samstag",
            ],
            day_short: ["So", "Mo", "Di", "Mi", "Do", "Fr", "Sa"],
            label: {
              description: "Beschreibung",
            },
            buttons: {
              save: "Speichern",
              cancel: "Abbrechen",
              delete: "Löschen",
            },
          },
          ja: {
            month_full: [
              "1月",
              "2月",
              "3月",
              "4月",
              "5月",
              "6月",
              "7月",
              "8月",
              "9月",
              "10月",
              "11月",
              "12月",
            ],
            month_short: [
              "1月",
              "2月",
              "3月",
              "4月",
              "5月",
              "6月",
              "7月",
              "8月",
              "9月",
              "10月",
              "11月",
              "12月",
            ],
            day_full: [
              "日曜日",
              "月曜日",
              "火曜日",
              "水曜日",
              "木曜日",
              "金曜日",
              "土曜日",
            ],
            day_short: ["太陽", "月", "火", "結婚した", "木", "金", "土"],
            label: {
              description: "説明",
            },
            buttons: {
              save: "保存する",
              cancel: "キャンセル",
              delete: "削除",
            },
          },
          ar: {
            month_full: [
              "كانون الثاني",
              "شباط",
              "آذار",
              "نيسان",
              "أيار",
              "حزيران",
              "تموز",
              "آب",
              "أيلول",
              "تشرين الأول",
              "تشرين الثاني",
              "كانون الأول",
            ],
            month_short: [
              "يناير",
              "فبراير",
              "مارس",
              "أبريل",
              "مايو",
              "يونيو",
              "يوليو",
              "أغسطس",
              "سبتمبر",
              "أكتوبر",
              "نوفمبر",
              "ديسمبر",
            ],
            day_full: [
              "الأحد",
              "الأثنين",
              "ألثلاثاء",
              "الأربعاء",
              "ألحميس",
              "ألجمعة",
              "السبت",
            ],
            day_short: [
              "احد",
              "اثنين",
              "ثلاثاء",
              "اربعاء",
              "خميس",
              "جمعة",
              "سبت",
            ],
            label: {
              description: "وصف",
            },
            buttons: {
              save: "يحفظ",
              cancel: "يلغي",
              delete: "يمسح",
            },
          },
          be: {
            month_full: [
              "Студзень",
              "Люты",
              "Сакавік",
              "Красавік",
              "Maй",
              "Чэрвень",
              "Ліпень",
              "Жнівень",
              "Верасень",
              "Кастрычнік",
              "Лістапад",
              "Снежань",
            ],
            month_short: [
              "Студз",
              "Лют",
              "Сак",
              "Крас",
              "Maй",
              "Чэр",
              "Ліп",
              "Жнів",
              "Вер",
              "Каст",
              "Ліст",
              "Снеж",
            ],
            day_full: [
              "Нядзеля",
              "Панядзелак",
              "Аўторак",
              "Серада",
              "Чацвер",
              "Пятніца",
              "Субота",
            ],
            day_short: ["Нд", "Пн", "Аўт", "Ср", "Чцв", "Пт", "Сб"],
            label: {
              description: "Апісанне",
            },
            buttons: {
              save: "Захаваць",
              cancel: "Адмяніць",
              delete: "Выдаліць",
            },
          },
          ca: {
            month_full: [
              "Gener",
              "Febrer",
              "Març",
              "Abril",
              "Maig",
              "Juny",
              "Juliol",
              "Agost",
              "Setembre",
              "Octubre",
              "Novembre",
              "Desembre",
            ],
            month_short: [
              "Gen",
              "Feb",
              "Mar",
              "Abr",
              "Mai",
              "Jun",
              "Jul",
              "Ago",
              "Set",
              "Oct",
              "Nov",
              "Des",
            ],
            day_full: [
              "Diumenge",
              "Dilluns",
              "Dimarts",
              "Dimecres",
              "Dijous",
              "Divendres",
              "Dissabte",
            ],
            day_short: ["Dg", "Dl", "Dm", "Dc", "Dj", "Dv", "Ds"],
            label: {
              description: "Descripció",
            },
            buttons: {
              save: "Desa",
              cancel: "Cancel · lar",
              delete: "Suprimeix",
            },
          },
          cn: {
            month_full: [
              "一月",
              "二月",
              "三月",
              "四月",
              "五月",
              "六月",
              "七月",
              "八月",
              "九月",
              "十月",
              "十一月",
              "十二月",
            ],
            month_short: [
              "简",
              "二月",
              "三月",
              "四月",
              "可能",
              "君",
              "七月",
              "八月",
              "九月",
              "十月",
              "十一月",
              "十二月",
            ],
            day_full: [
              "星期日",
              "星期一",
              "星期二",
              "星期三",
              "星期四",
              "星期五",
              "星期六",
            ],
            day_short: [
              "太阳",
              "星期一",
              "星期二",
              "星期三",
              "星期四",
              "星期五",
              "星期六",
            ],
            label: {
              description: "描述",
            },
            buttons: {
              save: "节省",
              cancel: "取消",
              delete: "删除",
            },
          },
          hr: {
            month_full: [
              "Siječanj",
              "Veljača",
              "Ožujak",
              "Travanj",
              "Svibanj",
              "Lipanj",
              "Srpanj",
              "Kolovoz",
              "Rujan",
              "Listopad",
              "Studeni",
              "Prosinac",
            ],
            month_short: [
              "Sij",
              "Velj",
              "Ožu",
              "Tra",
              "Svi",
              "Lip",
              "Srp",
              "Kol",
              "Ruj",
              "Lis",
              "Stu",
              "Pro",
            ],
            day_full: [
              "Nedjelja",
              "Ponedjeljak",
              "Utorak",
              "Srijeda",
              "Četvrtak",
              "Petak",
              "Subota",
            ],
            day_short: ["Ned", "Pon", "Uto", "Sri", "Čet", "Pet", "Sub"],
            label: {
              description: "Opis",
            },
            buttons: {
              save: "Uštedjeti",
              cancel: "Otkazati",
              delete: "Izbrisati",
            },
          },
          cs: {
            month_full: [
              "Leden",
              "Únor",
              "Březen",
              "Duben",
              "Květen",
              "Červen",
              "Červenec",
              "Srpen",
              "Září",
              "Říjen",
              "Listopad",
              "Prosinec",
            ],
            month_short: [
              "Led",
              "Ún",
              "Bře",
              "Dub",
              "Kvě",
              "Čer",
              "Čec",
              "Srp",
              "Září",
              "Říj",
              "List",
              "Pro",
            ],
            day_full: [
              "Neděle",
              "Pondělí",
              "Úterý",
              "Středa",
              "Čtvrtek",
              "Pátek",
              "Sobota",
            ],
            day_short: ["Ne", "Po", "Út", "St", "Čt", "Pá", "So"],
            label: {
              description: "Popis",
            },
            buttons: {
              save: "Uložit",
              cancel: "zrušení",
              delete: "Vymazat",
            },
          },
          da: {
            month_full: [
              "Januar",
              "Februar",
              "Mars",
              "April",
              "Mai",
              "Juni",
              "Juli",
              "August",
              "September",
              "Oktober",
              "November",
              "Desember",
            ],
            month_short: [
              "Jan",
              "Feb",
              "Mar",
              "Apr",
              "Mai",
              "Jun",
              "Jul",
              "Aug",
              "Sep",
              "Okt",
              "Nov",
              "Des",
            ],
            day_full: [
              "Søndag",
              "Mandag",
              "Tirsdag",
              "Onsdag",
              "Torsdag",
              "Fredag",
              "Lørdag",
            ],
            day_short: ["Søn", "Man", "Tir", "Ons", "Tor", "Fre", "Lør"],
            label: {
              description: "Beskrivelse",
            },
            buttons: {
              save: "Gemme",
              cancel: "Afbestille",
              delete: "Slet",
            },
          },
          nl: {
            month_full: [
              "Januari",
              "Februari",
              "Maart",
              "April",
              "Mei",
              "Juni",
              "Juli",
              "Augustus",
              "September",
              "Oktober",
              "November",
              "December",
            ],
            month_short: [
              "Jan",
              "Feb",
              "mrt",
              "Apr",
              "Mei",
              "Jun",
              "Jul",
              "Aug",
              "Sep",
              "Okt",
              "Nov",
              "Dec",
            ],
            day_full: [
              "Zondag",
              "Maandag",
              "Dinsdag",
              "Woensdag",
              "Donderdag",
              "Vrijdag",
              "Zaterdag",
            ],
            day_short: ["Zo", "Ma", "Di", "Wo", "Do", "Vr", "Za"],
            label: {
              description: "Beschrijving",
            },
            buttons: {
              save: "Redden",
              cancel: "Annuleren",
              delete: "Verwijderen",
            },
          },
          fi: {
            month_full: [
              "Tammikuu",
              "Helmikuu",
              "Maaliskuu",
              "Huhtikuu",
              "Toukokuu",
              "Kes&auml;kuu",
              "Hein&auml;kuu",
              "Elokuu",
              "Syyskuu",
              "Lokakuu",
              "Marraskuu",
              "Joulukuu",
            ],
            month_short: [
              "Tam",
              "Hel",
              "Maa",
              "Huh",
              "Tou",
              "Kes",
              "Hei",
              "Elo",
              "Syy",
              "Lok",
              "Mar",
              "Jou",
            ],
            day_full: [
              "Sunnuntai",
              "Maanantai",
              "Tiistai",
              "Keskiviikko",
              "Torstai",
              "Perjantai",
              "Lauantai",
            ],
            day_short: ["Su", "Ma", "Ti", "Ke", "To", "Pe", "La"],
            label: {
              description: "Kuvaus",
            },
            buttons: {
              save: "Tallentaa",
              cancel: "Peruuttaa",
              delete: "Poistaa",
            },
          },
          el: {
            month_full: [
              "Ιανουάριος",
              "Φεβρουάριος",
              "Μάρτιος",
              "Απρίλιος",
              "Μάϊος",
              "Ιούνιος",
              "Ιούλιος",
              "Αύγουστος",
              "Σεπτέμβριος",
              "Οκτώβριος",
              "Νοέμβριος",
              "Δεκέμβριος",
            ],
            month_short: [
              "ΙΑΝ",
              "ΦΕΒ",
              "ΜΑΡ",
              "ΑΠΡ",
              "ΜΑΙ",
              "ΙΟΥΝ",
              "ΙΟΥΛ",
              "ΑΥΓ",
              "ΣΕΠ",
              "ΟΚΤ",
              "ΝΟΕ",
              "ΔΕΚ",
            ],
            day_full: [
              "Κυριακή",
              "Δευτέρα",
              "Τρίτη",
              "Τετάρτη",
              "Πέμπτη",
              "Παρασκευή",
              "Κυριακή",
            ],
            day_short: ["ΚΥ", "ΔΕ", "ΤΡ", "ΤΕ", "ΠΕ", "ΠΑ", "ΣΑ"],
            label: {
              description: "Περιγραφή",
            },
            buttons: {
              save: "Αποθηκεύσετε",
              cancel: "Ματαίωση",
              delete: "Διαγράφω",
            },
          },
          hu: {
            month_full: [
              "Január",
              "Február",
              "Március",
              "Április",
              "Május",
              "Június",
              "Július",
              "Augusztus",
              "Szeptember",
              "Október",
              "November",
              "December",
            ],
            month_short: [
              "Jan",
              "Feb",
              "Már",
              "Ápr",
              "Máj",
              "Jún",
              "Júl",
              "Aug",
              "Sep",
              "Okt",
              "Nov",
              "Dec",
            ],
            day_full: [
              "Vasárnap",
              "Hétfõ",
              "Kedd",
              "Szerda",
              "Csütörtök",
              "Péntek",
              "szombat",
            ],
            day_short: ["Va", "Hé", "Ke", "Sze", "Csü", "Pé", "Szo"],
            label: {
              description: "Leírás",
            },
            buttons: {
              save: "Megment",
              cancel: "Megszünteti",
              delete: "Töröl",
            },
          },
          id: {
            month_full: [
              "Januari",
              "Februari",
              "Maret",
              "April",
              "Mei",
              "Juni",
              "Juli",
              "Agustus",
              "September",
              "Oktober",
              "November",
              "Desember",
            ],
            month_short: [
              "Jan",
              "Feb",
              "Mar",
              "Apr",
              "Mei",
              "Jun",
              "Jul",
              "Ags",
              "Sep",
              "Okt",
              "Nov",
              "Des",
            ],
            day_full: [
              "Minggu",
              "Senin",
              "Selasa",
              "Rabu",
              "Kamis",
              "Jumat",
              "Sabtu",
            ],
            day_short: ["Ming", "Sen", "Sel", "Rab", "Kam", "Jum", "Sab"],
            label: {
              description: "Keterangan",
            },
            buttons: {
              save: "Menyimpan",
              cancel: "Membatalkan",
              delete: "Menghapus",
            },
          },
          it: {
            month_full: [
              "Gennaio",
              "Febbraio",
              "Marzo",
              "Aprile",
              "Maggio",
              "Giugno",
              "Luglio",
              "Agosto",
              "Settembre",
              "Ottobre",
              "Novembre",
              "Dicembre",
            ],
            month_short: [
              "Gen",
              "Feb",
              "Mar",
              "Apr",
              "Mag",
              "Giu",
              "Lug",
              "Ago",
              "Set",
              "Ott",
              "Nov",
              "Dic",
            ],
            day_full: [
              "Domenica",
              "Lunedì",
              "Martedì",
              "Mercoledì",
              "Giovedì",
              "Venerdì",
              "Sabato",
            ],
            day_short: ["Dom", "Lun", "Mar", "Mer", "Gio", "Ven", "Sab"],
            label: {
              description: "Descrizione",
            },
            buttons: {
              save: "Salva",
              cancel: "Annulla",
              delete: "Eliminare",
            },
          },
          kr: {
            month_full: [
              "1월",
              "2월",
              "3월",
              "4월",
              "5월",
              "6월",
              "7월",
              "8월",
              "9월",
              "10월",
              "11월",
              "12월",
            ],
            month_short: [
              "1월",
              "2월",
              "3월",
              "4월",
              "5월",
              "6월",
              "7월",
              "8월",
              "9월",
              "10월",
              "11월",
              "12월",
            ],
            day_full: [
              "일요일",
              "월요일",
              "화요일",
              "수요일",
              "목요일",
              "금요일",
              "토요일",
            ],
            day_short: ["일", "월", "화", "수", "목", "금", "토"],
            label: {
              description: "설명",
            },
            buttons: {
              save: "구하다",
              cancel: "취소",
              delete: "삭제",
            },
          },
          fa: {
            month_full: [
              "ژانویه",
              "فوریه",
              "مارس",
              "آوریل",
              "مه",
              "ژوئن",
              "ژوئیه",
              "اوت",
              "سپتامبر",
              "اکتبر",
              "نوامبر",
              "دسامبر",
            ],
            month_short: [
              "1",
              "2",
              "3",
              "4",
              "5",
              "6",
              "7",
              "8",
              "9",
              "10",
              "11",
              "12",
            ],
            day_full: [
              "يکشنبه",
              "دوشنبه",
              "سه‌شنبه",
              "چهارشنبه",
              "پنجشنبه",
              "جمعه",
              "شنبه",
            ],
            day_short: ["ی", "د", "س", "چ", "پ", "ج", "ش"],
            label: {
              description: "شرح",
            },
            buttons: {
              save: "صرفه جویی",
              cancel: "لغو کنید",
              delete: "حذف",
            },
          },
          pl: {
            month_full: [
              "Styczeń",
              "Luty",
              "Marzec",
              "Kwiecień",
              "Maj",
              "Czerwiec",
              "Lipiec",
              "Sierpień",
              "Wrzesień",
              "Październik",
              "Listopad",
              "Grudzień",
            ],
            month_short: [
              "Sty",
              "Lut",
              "Mar",
              "Kwi",
              "Maj",
              "Cze",
              "Lip",
              "Sie",
              "Wrz",
              "Paź",
              "Lis",
              "Gru",
            ],
            day_full: [
              "Niedziela",
              "Poniedziałek",
              "Wtorek",
              "Środa",
              "Czwartek",
              "Piątek",
              "Sobota",
            ],
            day_short: ["Nie", "Pon", "Wto", "Śro", "Czw", "Pią", "Sob"],
            label: {
              description: "Opis",
            },
            buttons: {
              save: "Ratować",
              cancel: "Anulować",
              delete: "Usuwać",
            },
          },
          pt: {
            month_full: [
              "Janeiro",
              "Fevereiro",
              "Março",
              "Abril",
              "Maio",
              "Junho",
              "Julho",
              "Agosto",
              "Setembro",
              "Outubro",
              "Novembro",
              "Dezembro",
            ],
            month_short: [
              "Jan",
              "Fev",
              "Mar",
              "Abr",
              "Mai",
              "Jun",
              "Jul",
              "Ago",
              "Set",
              "Out",
              "Nov",
              "Dez",
            ],
            day_full: [
              "Domingo",
              "Segunda",
              "Terça",
              "Quarta",
              "Quinta",
              "Sexta",
              "Sábado",
            ],
            day_short: ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sab"],
            label: {
              description: "Descrição",
            },
            buttons: {
              save: "Salvar",
              cancel: "Cancelar",
              delete: "Excluir",
            },
          },
          ro: {
            month_full: [
              "Ianuarie",
              "Februarie",
              "Martie",
              "Aprilie",
              "Mai",
              "Iunie",
              "Iulie",
              "August",
              "Septembrie",
              "Octombrie",
              "November",
              "December",
            ],
            month_short: [
              "Ian",
              "Feb",
              "Mar",
              "Apr",
              "Mai",
              "Iun",
              "Iul",
              "Aug",
              "Sep",
              "Oct",
              "Nov",
              "Dec",
            ],
            day_full: [
              "Duminica",
              "Luni",
              "Marti",
              "Miercuri",
              "Joi",
              "Vineri",
              "Sambata",
            ],
            day_short: ["Du", "Lu", "Ma", "Mi", "Jo", "Vi", "Sa"],
            label: {
              description: "Descriere",
            },
            buttons: {
              save: "Salvați",
              cancel: "Anulare",
              delete: "Șterge",
            },
          },
          ru: {
            month_full: [
              "Январь",
              "Февраль",
              "Март",
              "Апрель",
              "Maй",
              "Июнь",
              "Июль",
              "Август",
              "Сентябрь",
              "Oктябрь",
              "Ноябрь",
              "Декабрь",
            ],
            month_short: [
              "Янв",
              "Фев",
              "Maр",
              "Aпр",
              "Maй",
              "Июн",
              "Июл",
              "Aвг",
              "Сен",
              "Окт",
              "Ноя",
              "Дек",
            ],
            day_full: [
              "Воскресенье",
              "Понедельник",
              "Вторник",
              "Среда",
              "Четверг",
              "Пятница",
              "Суббота",
            ],
            day_short: ["Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"],
            label: {
              description: "Описание",
            },
            buttons: {
              save: "Сохранять",
              cancel: "Отмена",
              delete: "Удалить",
            },
          },
          si: {
            month_full: [
              "Januar",
              "Februar",
              "Marec",
              "April",
              "Maj",
              "Junij",
              "Julij",
              "Avgust",
              "September",
              "Oktober",
              "November",
              "December",
            ],
            month_short: [
              "Jan",
              "Feb",
              "Mar",
              "Apr",
              "Maj",
              "Jun",
              "Jul",
              "Aug",
              "Sep",
              "Okt",
              "Nov",
              "Dec",
            ],
            day_full: [
              "Nedelja",
              "Ponedeljek",
              "Torek",
              "Sreda",
              "Četrtek",
              "Petek",
              "Sobota",
            ],
            day_short: ["Ned", "Pon", "Tor", "Sre", "Čet", "Pet", "Sob"],
            label: {
              description: "Opis",
            },
            buttons: {
              save: "Shrani",
              cancel: "Prekliči",
              delete: "Izbriši",
            },
          },
          es: {
            month_full: [
              "Enero",
              "Febrero",
              "Marzo",
              "Abril",
              "Mayo",
              "Junio",
              "Julio",
              "Agosto",
              "Septiembre",
              "Octubre",
              "Noviembre",
              "Diciembre",
            ],
            month_short: [
              "Ene",
              "Feb",
              "Mar",
              "Abr",
              "May",
              "Jun",
              "Jul",
              "Ago",
              "Sep",
              "Oct",
              "Nov",
              "Dic",
            ],
            day_full: [
              "Domingo",
              "Lunes",
              "Martes",
              "Miércoles",
              "Jueves",
              "Viernes",
              "Sábado",
            ],
            day_short: ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"],
            label: {
              description: "Descripción",
            },
            buttons: {
              save: "Ahorrar",
              cancel: "Cancelar",
              delete: "Borrar",
            },
          },
          sv: {
            month_full: [
              "Januari",
              "Februari",
              "Mars",
              "April",
              "Maj",
              "Juni",
              "Juli",
              "Augusti",
              "September",
              "Oktober",
              "November",
              "December",
            ],
            month_short: [
              "Jan",
              "Feb",
              "Mar",
              "Apr",
              "Maj",
              "Jun",
              "Jul",
              "Aug",
              "Sep",
              "Okt",
              "Nov",
              "Dec",
            ],
            day_full: [
              "Söndag",
              "Måndag",
              "Tisdag",
              "Onsdag",
              "Torsdag",
              "Fredag",
              "Lördag",
            ],
            day_short: ["Sön", "Mån", "Tis", "Ons", "Tor", "Fre", "Lör"],
            label: {
              description: "Beskrivning",
            },
            buttons: {
              save: "Spara",
              cancel: "Annullera",
              delete: "Radera",
            },
          },
          tr: {
            month_full: [
              "Ocak",
              "Şubat",
              "Mart",
              "Nisan",
              "Mayıs",
              "Haziran",
              "Temmuz",
              "Ağustos",
              "Eylül",
              "Ekim",
              "Kasım",
              "Aralık",
            ],
            month_short: [
              "Oca",
              "Şub",
              "Mar",
              "Nis",
              "May",
              "Haz",
              "Tem",
              "Ağu",
              "Eyl",
              "Eki",
              "Kas",
              "Ara",
            ],
            day_full: [
              "Pazar",
              "Pazartesi",
              "Salı",
              "Çarşamba",
              "Perşembe",
              "Cuma",
              "Cumartesi",
            ],
            day_short: ["Paz", "Pzt", "Sal", "Çar", "Per", "Cum", "Cmt"],
            label: {
              description: "Tanım",
            },
            buttons: {
              save: "Kaydetmek",
              cancel: "İptal etmek",
              delete: "Silmek",
            },
          },
          ua: {
            month_full: [
              "Січень",
              "Лютий",
              "Березень",
              "Квітень",
              "Травень",
              "Червень",
              "Липень",
              "Серпень",
              "Вересень",
              "Жовтень",
              "Листопад",
              "Грудень",
            ],
            month_short: [
              "Січ",
              "Лют",
              "Бер",
              "Кві",
              "Тра",
              "Чер",
              "Лип",
              "Сер",
              "Вер",
              "Жов",
              "Лис",
              "Гру",
            ],
            day_full: [
              "Неділя",
              "Понеділок",
              "Вівторок",
              "Середа",
              "Четвер",
              "П'ятниця",
              "Субота",
            ],
            day_short: ["Нед", "Пон", "Вів", "Сер", "Чет", "Птн", "Суб"],
            label: {
              description: "опис",
            },
            buttons: {
              save: "зберегти",
              cancel: "Скасувати",
              delete: "Видалити",
            },
          },
          he: {
            month_full: [
              "ינואר",
              "פברואר",
              "מרץ",
              "אפריל",
              "מאי",
              "יוני",
              "יולי",
              "אוגוסט",
              "ספטמבר",
              "אוקטובר",
              "נובמבר",
              "דצמבר",
            ],
            month_short: [
              "ינואר",
              "פברואר",
              "מרץ",
              "אפריל",
              "מאי",
              "יוני",
              "יולי",
              "אוגוסט",
              "ספטמבר",
              "אוקטובר",
              "נובמבר",
              "דצמבר",
            ],
            day_full: [
              "יוֹם רִאשׁוֹן",
              "יוֹם שֵׁנִי",
              "יוֹם שְׁלִישִׁי",
              "יום רביעי",
              "יוֹם חֲמִישִׁי",
              "יוֹם שִׁישִׁי",
              "יום שבת",
            ],
            day_short: [
              "שמש",
              "יום שני",
              "ג'",
              "היינו עושים",
              "יום ה'",
              "שישי",
              "ישב",
            ],
            label: {
              description: "תיאור",
            },
            buttons: {
              save: "להציל",
              cancel: "לְבַטֵל",
              delete: "לִמְחוֹק",
            },
          },
          no: {
            month_full: [
              "januar",
              "februar",
              "mars",
              "april",
              "Kan",
              "juni",
              "juli",
              "august",
              "september",
              "oktober",
              "november",
              "desember",
            ],
            month_short: [
              "Jan",
              "feb",
              "Mar",
              "apr",
              "Kan",
              "jun",
              "jul",
              "august",
              "sep",
              "okt",
              "nov",
              "des",
            ],
            day_full: [
              "søndag",
              "Monday",
              "tirsdag",
              "onsdag",
              "Torsdag",
              "fredag",
              "lørdag",
            ],
            day_short: ["Søn", "man", "tirs", "ons", "tor", "fre", "Lør"],
            label: {
              description: "Beskrivelse",
            },
            buttons: {
              save: "Lagre",
              cancel: "Avbryt",
              delete: "Slett",
            },
          },
          sk: {
            month_full: [
              "Január",
              "február",
              "marec",
              "apríl",
              "máj",
              "jún",
              "júl",
              "august",
              "september",
              "október",
              "november",
              "december",
            ],
            month_short: [
              "Jan",
              "Feb",
              "Mar",
              "Apr",
              "máj",
              "Jun",
              "júl",
              "Aug",
              "Sep",
              "október",
              "Nov",
              "Dec",
            ],
            day_full: [
              "Nedeľa",
              "pondelok",
              "utorok",
              "streda",
              "štvrtok",
              "piatok",
              "sobota",
            ],
            day_short: ["Ne", "Po", "Ut", "St", "Št", "Pia", "So"],
            label: {
              description: "Popis",
            },
            buttons: {
              save: "Uložiť",
              cancel: "Zrušiť",
              delete: "Odstrániť",
            },
          },
        },
        localLang: opt.localLang || "en",
        currentLanguage: {},
        ganttHeight: 0,
      };
    },

    // initialize templates
    initTemplates: function (templ) {
      if (templ == null) {
        templ = {};
      }

      this.templates = {
        tooltip_text:
          templ.tooltip_text ||
          function (start, end, task) {
            return (
              "<b>Task:</b> " +
              task.text +
              "<br/><b>Start date:</b> " +
              start +
              "<br/><b>End date:</b> " +
              end
            );
          },
        taskbar_text:
          templ.taskbar_text ||
          function (start, end, task) {
            return task.text;
          },
        task_drag:
          templ.task_drag ||
          function (mode, task) {
            return true;
          },
        grid_folder:
          templ.grid_folder ||
          function (task) {
            return " ";
          },
        grid_file:
          templ.grid_file ||
          function (task) {
            return " ";
          },
        grid_blank:
          templ.grid_blank ||
          function (task) {
            return " ";
          },
        showLightBox: templ.showLightBox || undefined,
        grid_header_class: templ.grid_header_class || undefined,
        grid_row_class: templ.grid_row_class || undefined,
        task_class: templ.task_class || undefined,
        task_row_class: templ.task_row_class || undefined,
        scale_cell_class: templ.scale_cell_class || undefined,
        grid_cell_class: templ.grid_cell_class || undefined,
        timeline_cell_class: templ.timeline_cell_class || undefined,
      };
    },

    // Get array of dates between the range of startDate and endDate
    getDates: function (startDate, endDate) {
      // Convert to timestamps and normalize to start of the day
      const start = new Date(startDate).setHours(0, 0, 0, 0);
      const end = new Date(endDate).setHours(0, 0, 0, 0);

      // Array to hold the dates
      const dates = [];

      // Loop through each date from start to end
      for (
        let currentDate = start;
        currentDate <= end;
        currentDate += 86400000
      ) {
        dates.push(currentDate);
      }

      return dates;
    },

    init: function () {
      this.options.currentLanguage = this.options.i18n[this.options.localLang];

      /*for Safari below v16 */
      document.removeEventListener(
        "webkitfullscreenchange",
        this.handleFullScreenChangeSafari
      );
      document.addEventListener(
        "webkitfullscreenchange",
        this.handleFullScreenChangeSafari
      );

      // Listen for the fullscreenchange event
      document.removeEventListener(
        "fullscreenchange",
        this.handleFullScreenChange
      );
      document.addEventListener(
        "fullscreenchange",
        this.handleFullScreenChange
      );

      window.removeEventListener("resize", this.handleResizeWindow);
      window.addEventListener("resize", this.handleResizeWindow);

      this.createTooltip();

      if (this.templates?.showLightBox !== false) {
        this.createLightbox();
      }
    },

    handleResizeWindow(event) {
      if (
        this.calculateTimeLineWidth("updated") !==
        this.calculateTimeLineWidth("current")
      ) {
        this.updateBody();
      }

      // handle custom event
      this.dispatchEvent("onResize", { event });
    },

    handleFullScreenChangeSafari() {
      // Check if full screen mode has been exited
      if (!document.webkitIsFullScreen) {
        this.element.classList.remove("zt-gantt-fullScreen");
        this.exitFullScreen(true);
      }
    },

    handleFullScreenChange() {
      // Check if full screen mode has been exited
      if (!document.fullscreenElement) {
        this.element.classList.remove("zt-gantt-fullScreen");
        this.exitFullScreen(true);
      }
    },

    // render the zt-gantt chart
    render: function (ele = this.element) {
      if (
        this.options.weekStart > 6 ||
        typeof this.options.weekStart !== "number"
      ) {
        let message =
          this.options.weekStart > 6
            ? "enter week start between 0 to 6"
            : "type of week start should be number!";
        this.toastr("Error", message, "error");
      }
      if (!this.options.date_format) {
        this.toastr(
          "Error",
          `date_format is ${this.options.date_format}, please provide a valid date format of your data date format`,
          "error"
        );
      }

      this.element = ele || this.element;
      const options = this.options;
      this.options.currentLanguage = this.options.i18n[this.options.localLang];
      this.zoomInit("initial");
      function createNestedTree(
        flatArray,
        parentIdKey = "parent",
        idKey = "id"
      ) {
        const tree = [];

        const map = {};
        flatArray.forEach((item) => {
          const id = item[idKey];
          const parentId = item[parentIdKey];

          map[id] = { ...item, children: map[id] ? map[id].children : [] };

          if (!parentId) {
            tree.push(map[id]);
          } else {
            map[parentId] = map[parentId] || { children: [] };
            map[parentId].children.push(map[id]);
          }
        });

        return tree;
      }

      // create a copy of the data
      if (this.options.arrangeData) {
        this.originalData = [...this.options.data];
      }

      const originalData = this.originalData;
      const { date_format } = options;
      const originalDataLength = originalData.length;

      // Process start_date
      for (let i = 0; i < originalDataLength; i++) {
        if (originalData[i].start_date !== undefined) {
          let startDate = originalData[i].start_date;
          const parsedStartDate = new Date(startDate);
          if (isNaN(parsedStartDate) && date_format) {
            console.log(parsedStartDate, "parsedStartDate");
            originalData[i].start_date = this.getDateTimeComponents(startDate);
          } else {
            this.hasHours = false;
            if (isNaN(startDate)) {
              this.getDateTimeComponents(this.originalData[i].start_date);
              if (this.hasHours !== true && !isNaN(parsedStartDate)) {
                originalData[i].start_date = this.stripTime(parsedStartDate);
              }
            }
          }
        }

        // Process end_date
        if (originalData[i].end_date !== undefined) {
          let endDate = originalData[i].end_date;
          const parsedEndDate = new Date(endDate);
          if (isNaN(parsedEndDate) && date_format) {
            originalData[i].end_date = this.getDateTimeComponents(endDate);
          } else {
            this.hasHours = false;
            if (isNaN(endDate)) {
              this.getDateTimeComponents(endDate);
              if (this.hasHours !== true && !isNaN(parsedEndDate)) {
                this.originalData[i].end_date = this.stripTime(parsedEndDate);
              }
            }
          }
        }
      }

      let nestedData = createNestedTree(this.originalData);
      this.options.data = nestedData;

      // calculate and add duration and start and end date in all data objects
      this.updateTaskDuration();

      this.options.arrangeData = false;

      let startAndEndDate = this.getStartAndEndDate(options.data);
      if (!this.options.startDate) {
        this.options.startDate = startAndEndDate.startDate;
      }
      if (!this.options.endDate) {
        this.options.endDate = startAndEndDate.endDate;
      }
      this.dates = this.getDates(options.startDate, options.endDate);
      let dates = this.dates;
      const weekday = this.options.dateFormat.day_short;
      if (!options.fullWeek) {
        dates = this.filterWeekends(dates);
        this.dates = dates;
      }

      // set all task expanded initially if collapse is false
      if (!options.collapse && options?.openedTasks?.length === 0) {
        this.options.openedTasks = this.setAllExpand(this.options.data, []);
      }

      if (this.fullScreen === true) {
        this.element.classList.add("zt-gantt-fullScreen");
      }

      let mainContainer = document.createElement("div");
      mainContainer.classList.add("zt-gantt-layout", "zt-gantt-d-flex");
      mainContainer.id = "zt-gantt-layout";

      this.createSidebar(options, mainContainer);

      let calendar = document.createElement("div");
      calendar.classList.add("zt-gantt-right-cell");
      calendar.id = "zt-gantt-right-cell";

      this.createHeaderScale(dates, calendar, options);
      this.createBody(options, dates, calendar, mainContainer, weekday, true);

      if (options.rightGrid) {
        let newGridOptions = { ...options };
        newGridOptions.columns = options.rightGrid;
        this.createRightSidebar(newGridOptions, mainContainer);
      }

      verScroll =
        document.querySelector(".zt-gantt-ver-scroll")?.scrollTop || 0;
      horScroll =
        document.querySelector(".zt-gantt-hor-scroll")?.scrollLeft || 0;

      // append zt-gantt-layout in element
      let layout = document.querySelector("#zt-gantt-layout");
      if (layout) {
        layout.replaceWith(mainContainer);
      } else {
        this.element.append(mainContainer);
      }

      this.createScrollbar(
        mainContainer,
        options,
        verScroll || 0,
        horScroll || 0
      );
      
      const rightDataContainer = document.querySelector("#zt-gantt-scale-data");
      if(!this.markerArea){
        markerArea = document.createElement("div");
        markerArea.classList.add("zt-gantt-marker-area");
        this.markerArea = markerArea;
        
        // add all markers
        for (let marker of this.options.customMarker) {
          if (this.outOfGanttRange(marker?.start_date)) continue;
          this.addMarkerToGantt(marker);
        }
      }
      rightDataContainer.append(this.markerArea);
      

      // add today marker
      if (options.todayMarker) {
        this.addTodayFlag();
      }

      let linksArea = document.createElement("div");
      linksArea.classList.add("zt-gantt-links-area");
      linksArea.id = "zt-gantt-links-area";
      rightDataContainer.append(linksArea);

      // create links
      for (let i = 0; i < this.options.links.length; i++) {
        this.createLinks(
          this.options.links[i].source,
          this.options.links[i].target,
          this.options.links[i]
        );
      }
    },

    // create left sidebar
    createSidebar: function (options, mainContainer) {
      // sidebar head cells
      let sidebar = document.createElement("div");
      sidebar.classList.add("zt-gantt-left-cell");
      sidebar.id = "zt-gantt-grid-left-data";
      let headCellContainer = document.createElement("div");
      headCellContainer.classList.add("sidebar-head-cell-container");
      let containerHeight = this.calculateScaleHeight(
        options.scales,
        options.scale_height,
        "header",
        0
      );

      const totalWidth = options.columns.reduce(
        (totalWidth, col) => totalWidth + col.width,
        0
      );

      sidebar.style.width = totalWidth + "px";
      sidebar.style.minWidth = totalWidth + "px";

      headCellContainer.style.height = containerHeight;
      headCellContainer.style.lineHeight = containerHeight;

      sidebar.append(headCellContainer);
      let resizerLeft = 0;
      // head loop of left side
      for (let i = 0; i < options.columns.length; i++) {
        let headCell = document.createElement("div");
        headCell.classList.add("head-cell");

        //add custom class from user
        this.addClassesFromFunction(
          this.templates.grid_header_class,
          headCell,
          options.columns[i],
          i
        );

        headCell.setAttribute("data-column-index", i);
        headCell.style.width = (options.columns[i].width || 80) + "px";
        headCell.innerHTML = options.columns[i].label;
        headCellContainer.append(headCell);

        if (this.options.sort) {
          headCell.addEventListener("click", () => {
            let isAsc = !this.options?.sortOption?.isAsc;
            const sortBy = options.columns[i]?.name;

            if (sortBy !== this.options?.sortOption?.sortBy) {
              isAsc = true; // Set isAsc to true by default if sortBy is different
            }
            this.options.sortOption = {
              sortBy: sortBy,
              isAsc,
            };
            this.sort(sortBy, isAsc);
          });

          // add sort icon to the current sorting column
          if (
            this.options?.sortOption &&
            this.options?.sortOption?.sortBy == options.columns[i]?.name
          ) {
            const sortIcon = document.createElement("div");
            let isAsc = !this.options?.sortOption?.isAsc;
            sortIcon.classList.add(
              "zt-gantt-sort",
              isAsc ? "zt-gantt-asc" : "zt-gantt-desc"
            );
            headCell.appendChild(sortIcon);
          }
        }

        if (i < options.columns.length) {
          let resizerWrap = document.createElement("div");
          resizerWrap.classList.add("zt-gantt-col-resizer-wrap");
          resizerWrap.id = "zt-gantt-col-resizer-wrap-" + i;
          resizerWrap.style.height = this.calculateScaleHeight(
            options.scales,
            options.scale_height,
            "header",
            0
          );

          if (options.columns[i].resize === true) {
            let resizer = document.createElement("div");
            resizer.classList.add("zt-gantt-col-resizer");
            resizerWrap.append(resizer);
            resizerLeft += options.columns[i].width || 80;
            resizerWrap.style.left = resizerLeft + "px";
            headCellContainer.append(resizerWrap);
            this.resizeColumns(
              resizerWrap,
              `data-column-index="${i}"`,
              headCell,
              headCellContainer,
              options.columns[i].min_width,
              options.columns[i].max_width,
              i,
              sidebar,
              false
            );
          }
        }
      }

      // data loop of left side
      let leftDataContainer = document.createElement("div");
      leftDataContainer.classList.add("zt-gantt-grid-data");
      leftDataContainer.id = "zt-gantt-left-grid";

      // loop through all the data
      for (let j = 0; j < options.data.length; j++) {
        if (this.searchedData) {
          this.options.openedTasks.push(options.data[j].id);
        }
        let dataItem = document.createElement("div");
        dataItem.classList.add(
          "zt-gantt-row-item",
          "zt-gantt-d-flex",
          this.options.selectedRow === `${options.data[j].id}`
            ? "zt-gantt-selected"
            : "zt-gantt-row-item"
        );

        //add custom classes from user
        const { start_date, end_date } = this.getLargeAndSmallDate(
          this.options.data[j]
        );
        this.addClassesFromFunction(
          this.templates.grid_row_class,
          dataItem,
          start_date,
          end_date,
          this.options.data[j]
        );

        dataItem.setAttribute("zt-gantt-data-task-id", j);
        dataItem.setAttribute("zt-gantt-task-id", options.data[j].id);
        dataItem.style.height = options.row_height + "px";
        dataItem.style.lineHeight = options.row_height + "px";
        let that = this;

        // handle double click event
        dataItem.addEventListener("dblclick", handleDblClick);

        function handleDblClick(e) {
          if (e.target.classList.contains("zt-gantt-tree-icon")) {
            return;
          }

          // custom event handler
          that.dispatchEvent("onBeforeTaskDblClick", {
            task: that.options.data[j],
          });

          // if onBeforeTaskDblClick return false then do not drag the task
          if (that.eventValue === false) {
            that.eventValue = true;
            return;
          }

          that.dispatchEvent("onTaskDblClick", { task: that.options.data[j] });

          that.showLightBox(that.options.data[j]);
        }

        // Handle mouseover event
        dataItem.addEventListener("mouseover", () => {
          this.updateTooltipBody(that.options.data[j]);
        });

        // Handle mouseleave event
        dataItem.addEventListener("mouseleave", this.hideTooltip.bind(this));

        this.addClickListener(dataItem, (e) => {
          if (e.target.classList.contains("zt-gantt-tree-icon")) {
            return;
          }

          let selectedRows = document.querySelectorAll(".zt-gantt-selected");
          let selectedTaskBars = document.querySelectorAll(
            ".zt-gantt-selected-task-bar"
          );

          // scroll horizontall scroll
          let horizontalScroll = document.querySelector(".zt-gantt-hor-scroll");
          cellBefore =
            document.querySelector(
              `[zt-gantt-taskbar-id="${options.data[j].id}"]`
            ).offsetLeft - 80;
          if (horizontalScroll) {
            horizontalScroll.scrollLeft = cellBefore < 0 ? 0 : cellBefore;
          }
          for (let item of selectedRows) {
            item.classList.remove("zt-gantt-selected");
          }

          for (let item of selectedTaskBars) {
            item.classList.remove("zt-gantt-selected-task-bar");
          }

          // select the selected task taskBar
          let currentTaskBar = document.querySelector(
            `[zt-gantt-taskbar-id="${options.data[j].id}"]`
          );
          currentTaskBar.classList.add("zt-gantt-selected-task-bar");

          let taskRow = document.querySelectorAll(
            `[zt-gantt-data-task-id="${j}"]`
          );
          for (let item of taskRow) {
            item.classList.add("zt-gantt-selected");
          }
          that.options.selectedRow = `${options.data[j].id}`;
          that.options.selectedTask = `${options.data[j].id}`;
        });

        // loop through all the columns
        for (let k = 0; k < options.columns.length; k++) {
          let cell = document.createElement("div");
          cell.classList.add("zt-gantt-cell");

          //add custom class from user
          this.addClassesFromFunction(
            this.templates.grid_cell_class,
            cell,
            this.options.columns[k],
            this.options.data[j]
          );

          cell.style.width = (options.columns[k].width || 80) + "px";
          options.columns[k].align
            ? (cell.style.textAlign = options.columns[k].align)
            : "";
          options.columns[k].align
            ? (cell.style.justifyContent = options.columns[k].align)
            : "";

          let content = document.createElement("div");
          content.classList.add(
            "zt-gantt-cell-data",
            `${k == 0 ? "zt-gantt-d-block" : "zt-gantt-data"}`
          );
          cell.setAttribute("data-column-index", k);

          let ztGanttBlank = document.createElement("div");
          ztGanttBlank.classList.add("zt-gantt-blank");

          ztGanttBlank.innerHTML = this.templates.grid_blank(options.data[j]);

          // function to get content HTML
          const getContentHTML = () => {
            return (
              this.options.columns[k].template(this.options.data[j]) ||
              this.options.data[j][this.options.columns[k].name] ||
              " "
            );
          };

          // content of the column
          content.innerHTML = getContentHTML();

          this.attachEvent("onAfterTaskUpdate", (e) => {
            content.innerHTML = getContentHTML();
          });

          // update content innerHTML on after progress drag
          this.attachEvent("onAfterProgressDrag", (e) => {
            content.innerHTML = getContentHTML();
          });

          this.attachEvent("onTaskDrag", (e) => {
            content.innerHTML = getContentHTML();
          });

          this.attachEvent("onAfterTaskDrag", (e) => {
            content.innerHTML = getContentHTML();
          });

          if (options.columns[k].tree) {
            cell.classList.add("zt-gantt-d-flex");

            // folder icon
            let folderIcon = document.createElement("div");
            folderIcon.classList.add("zt-gantt-folder-icon");
            folderIcon.innerHTML = this.templates.grid_folder(options.data[j]);

            if (
              options.data[j].children &&
              options.data[j].children.length > 0 &&
              !this.options.splitTask
            ) {
              // tree icon
              let treeIcon = document.createElement("div");
              treeIcon.classList.add(
                "zt-gantt-tree-icon",
                !this.options.openedTasks.includes(options.data[j].id)
                  ? "zt-gantt-tree-close"
                  : "zt-gantt-tree-open"
              );
              treeIcon.id = `toggle-tree-${j}`;
              cell.append(treeIcon);

              // toggle children
              let that = this;
              let toggleTreeIcon = treeIcon;
              this.addClickListener(toggleTreeIcon, () => {
                let children = document.getElementsByClassName(
                  `zt-gantt-child-${options.data[j].id}`
                );

                const isTaskOpened = toggleTreeIcon.classList.contains(
                  "zt-gantt-tree-close"
                );

                if (toggleTreeIcon.classList.contains("zt-gantt-tree-close")) {
                  that.options.openedTasks.push(options.data[j].id);

                  for (const child of that.options.data[j].children) {
                    if (child.children && child.children.length > 0) {
                      that.setCollapseAll(child.children, child.id, "open");
                    }
                  }
                } else {
                  const openedTasks = that.options.openedTasks.indexOf(
                    options.data[j].id
                  );
                  if (openedTasks > -1) {
                    that.options.openedTasks.splice(openedTasks, 1);
                  }

                  for (const child of this.options.data[j].children) {
                    if (child.children && child.children.length > 0) {
                      that.setCollapseAll(child.children, child.id, "collapse");
                    }
                  }
                }

                that.createTaskBars();
                for (let i = 0; i < children.length; i++) {
                  children[i].classList.toggle("zt-gantt-d-none");
                  children[i].classList.toggle("zt-gantt-d-flex");
                }

                toggleTreeIcon.classList.toggle("zt-gantt-tree-close");
                toggleTreeIcon.classList.toggle("zt-gantt-tree-open");
                that.createScrollbar(mainContainer, options);

                // custom event of toggle tree
                that.dispatchEvent("onTaskToggle", {
                  task: that.options.data[j],
                  isTaskOpened,
                });
              });
            } else if (!this.options.splitTask) {
              cell.append(ztGanttBlank);
            }
            cell.append(folderIcon);
          }
          cell.append(content);
          dataItem.append(cell);
          if (this.options.columns[k]?.editor) {
            cell.addEventListener("click", (e) => {
              if (e.target.classList.contains("zt-gantt-tree-icon")) return;
              this.addInlineEditor(
                this.options.data[j],
                this.options.columns[k].editor,
                cell,
                leftDataContainer
              );
            });
          }
        }

        let isTaskExist = this.getTask(options.data[j].id, this.searchedData);
        if (!this.searchedData || isTaskExist) {
          leftDataContainer.append(dataItem);
        }

        if (!this.options.splitTask) {
          this.createChildTask(
            options.data[j].children,
            options,
            leftDataContainer,
            1,
            j,
            false,
            this.options.openedTasks.includes(options.data[j].id)
          );
        }
      }
      sidebar.append(leftDataContainer);
      mainContainer.append(sidebar);

      let sidebarResizerWrap = document.createElement("div");
      sidebarResizerWrap.classList.add("zt-gantt-left-layout-resizer-wrap");
      sidebarResizerWrap.id = "zt-gantt-left-layout-resizer-wrap";
      sidebarResizerWrap.setAttribute("data-html2canvas-ignore", "true");
      let sidebarResizer = document.createElement("div");
      sidebarResizer.classList.add("zt-gantt-left-layout-resizer");
      sidebarResizerWrap.append(sidebarResizer);
      mainContainer.append(sidebarResizerWrap);
      sidebarResizerWrap.style.left = totalWidth + "px";
      this.resizeSidebar(sidebarResizerWrap, sidebarResizer, sidebar);
    },

    // create header of scale
    createHeaderScale: function (dates, calendar, options) {
      this.options.ganttHeight = this.calculateGanttHeight();
      this.attachEvent("onTaskToggle", () => {
        const isVerScrollExist =
          this.options.ganttHeight > this.element.offsetHeight;
        const tempHeight = this.calculateGanttHeight();

        if (
          (!isVerScrollExist && tempHeight > this.element.offsetHeight) ||
          (isVerScrollExist && tempHeight < this.element.offsetHeight)
        ) {
          this.options.ganttHeight = tempHeight;
          this.updateBody();
        }
      });

      let rightScale = document.createElement("div");
      rightScale.classList.add("zt-gantt-scale");
      rightScale.style.height = this.calculateScaleHeight(
        options.scales,
        options.scale_height,
        "header",
        0
      );

      for (let i = 0; i < options.scales.length; i++) {
        let ZTGanttScale = document.createElement("div");
        ZTGanttScale.classList.add(`zt-gantt-scale-container`);
        ZTGanttScale.style.height = this.calculateScaleHeight(
          options.scales,
          options.scale_height,
          "body",
          i
        );
        ZTGanttScale.style.lineHeight = this.calculateScaleHeight(
          options.scales,
          options.scale_height,
          "body",
          i
        );
        let rangeCount = 0;
        let endDate = new Date(0).getTime();

        for (let j = 0; j < dates.length; j++) {
          if (
            new Date(endDate).getTime() >=
            new Date(dates[j]).setHours(0, 0, 0, 0)
          ) {
            continue;
          }
          let dateFormat = this.isFunction(options.scales[i].format)
            ? options.scales[i].format(new Date(dates[j]))
            : this.formatDateToString(options.scales[i].format, dates[j]);
          let colDates;

          // if date scale unit is week || month || year || (day && step > 1)
          if (isMultiUnitScale(options.scales[i])) {
            colDates = this.initColSizes(
              options.scales[i].unit,
              options.scales[i].step,
              dates[j]
            );

            // remove weekoff days
            if (!options.fullWeek) {
              colDates.dateCount = this.filterWeekends(colDates.dateCount);
            }
          }

          function isMultiUnitScale(scale) {
            return scale.unit === "day" && scale.step > 1 ||
                   ["week", "month", "quarter", "year"].includes(scale.unit);
          }
          
          let dateCell = document.createElement("div");
          dateCell.classList.add("zt-gantt-scale-cell");

          //add custom class from user
          this.addClassesFromFunction(
            this.templates.scale_cell_class,
            dateCell,
            dates[j],
            this.options.scales[i],
            i
          );

          dateCell.innerHTML = `<span class="date-scale">${dateFormat}</span>`;
          if (
            (options.scales[i].unit == "day" && options.scales[i].step > 1) ||
            options.scales[i].unit == "week" ||
            options.scales[i].unit == "month" ||
            options.scales[i].unit == "quarter" ||
            options.scales[i].unit == "year"
          ) {
            dateCell.style.width =
              colDates.dateCount.length * this.calculateGridWidth(dates[j]) +
              "px";
            dateCell.style.left = rangeCount + "px";
          } else {
            dateCell.style.left =
              j * this.calculateGridWidth(dates[j], "day") + "px";
            dateCell.style.width =
              this.calculateGridWidth(dates[j], "day") + "px";
          }
          let currentDate = new Date(dates[j]).setHours(0, 0, 0, 0);
          if (
            ((options.scales[i].unit == "day" && options.scales[i].step > 1) ||
              options.scales[i].unit == "week" ||
              options.scales[i].unit == "month" ||
              options.scales[i].unit == "quarter" ||
              options.scales[i].unit == "year") &&
            new Date(endDate).getTime() < currentDate
          ) {
            ZTGanttScale.append(dateCell);
            rangeCount +=
              colDates.dateCount.length * this.calculateGridWidth(dates[j]);
            endDate = new Date(colDates.endDate);
          } else if (options.scales[i].unit == "hour") {
            let dateStartHour = new Date(dates[j]).getHours();
            let cellDate = new Date(dates[j]);
            let cellWidth = this.calculateGridWidth(dates[j]);
            const fragment = document.createDocumentFragment();
            for (let k = dateStartHour; k < 24; k++) {
              let hourCell = dateCell.cloneNode(true);

              let dateFormat = this.isFunction(options.scales[i].format)
                ? options.scales[i].format(cellDate)
                : this.formatDateToString(options.scales[i].format, cellDate);

              hourCell.innerHTML = dateFormat;
              cellDate.setHours(k + 1);
              hourCell.style.width = cellWidth + "px";
              hourCell.style.left = rangeCount + "px";
              // ZTGanttScale.append(hourCell);
              fragment.appendChild(hourCell);
              rangeCount += cellWidth;
            }
            ZTGanttScale.append(fragment);
          } else if (
            options.scales[i].unit == "day" &&
            options.scales[i].step == 1
          ) {
            ZTGanttScale.append(dateCell);
          }
        }
        rightScale.append(ZTGanttScale);
      }
      rightScale.style.width =
        this.calculateTimeLineWidth("updated", "day") + "px";
      calendar.append(rightScale);
    },

    // create grid body
    createBody: function (
      options,
      dates,
      calendar,
      mainContainer,
      weekday,
      isFromRender = false
    ) {
      let rightDataContainer = document.createElement("div");
      rightDataContainer.classList.add("zt-gantt-scale-data");
      rightDataContainer.id = "zt-gantt-scale-data";
      let ztGanttTaskData = document.createElement("div");
      ztGanttTaskData.classList.add("zt-gantt-task-data");

      const timelineRowTemplate = this.createRowTemplate();
      // grid data loop
      for (let j = 0; j < options.data.length; j++) {
        const isTaskExist = this.getTask(options.data[j].id, this.searchedData);

        if (this.searchedData && !isTaskExist) continue;

        const timelineRow = timelineRowTemplate.cloneNode(true);
        const isSelected = options.selectedRow === `${options.data[j].id}`;

        if (isSelected) timelineRow.classList.add("zt-gantt-selected");

        timelineRow.setAttribute("zt-gantt-data-task-id", j);
        timelineRow.setAttribute("zt-gantt-task-id", options.data[j].id);

        //add custom classes from user
        const { start_date, end_date } = this.getLargeAndSmallDate(
          options.data[j]
        );
        this.addClassesFromFunction(
          this.templates.task_row_class,
          timelineRow,
          start_date,
          end_date,
          this.options.data[j]
        );

        // handle cell click event
        this.addClickListener(timelineRow, (e) => {
          if (e.target.closest(".zt-gantt-task-cell")) {
            this.dispatchEvent("onCellClick", {
              task: this.options.data[j],
              cellDate: e.target.getAttribute("zt-gantt-cell-date"),
            });
          }
        });

        ztGanttTaskData.append(timelineRow);

        // if children exist
        if (this.options.data[j]?.children?.length && !this.options.splitTask) {
          this.createBodyChildTask(
            this.options.data[j].children,
            options,
            j,
            dates,
            weekday,
            ztGanttTaskData,
            j,
            this.options.openedTasks.includes(this.options.data[j].id)
          );
        }
      }

      rightDataContainer.style.width =
        this.calculateTimeLineWidth("updated", "day") + "px";
      rightDataContainer.append(ztGanttTaskData);
      calendar.append(rightDataContainer);

      let isCalendarExist = document.querySelector("#zt-gantt-right-cell");

      if (isCalendarExist && isFromRender === false) {
        isCalendarExist.replaceWith(calendar);
      } else {
        mainContainer.append(calendar);
      }

      this.createTaskBars(rightDataContainer, isFromRender);

      // create custom scroller
      if (!isFromRender) {
        this.createScrollbar(
          mainContainer,
          options,
          this.verScroll || 0,
          this.horScroll || 0
        );

        if(!this.markerArea){
          markerArea = document.createElement("div");
          markerArea.classList.add("zt-gantt-marker-area");
          this.markerArea = markerArea;
          
          // add all markers
          for (let marker of this.options.customMarker) {
            if (this.outOfGanttRange(marker?.start_date)) continue;
            this.addMarkerToGantt(marker);
          }
        }
        rightDataContainer.append(this.markerArea);

        // add today marker
        if (options.todayMarker) {
          this.addTodayFlag();
        }
      }

      if (this.options.selectAreaOnDrag === true) {
        this.selectAreaOnDrag(rightDataContainer);
      }
    },

    createRowTemplate: function () {
      const { options, dates } = this;
      const weekday = options.dateFormat.day_short;

      let timeLineRow = document.createElement("div");
      timeLineRow.classList.add("zt-gantt-task-row");

      timeLineRow.style.height = options.row_height + "px";
      let cellEndDate = new Date(0);
      let rangeCount = 0;

      const dateFormat =
        this.options.zoomLevel === "day"
          ? "%Y-%m-%d"
          : this.options.zoomLevel === "week"
          ? "W-%W"
          : this.options.zoomLevel === "month"
          ? "M-%m"
          : this.options.zoomLevel === "quarter"
          ? "Q-%q"
          : "%Y";

      for (let k = 0; k < dates.length; k++) {
        let date = new Date(dates[k]);

        if (new Date(cellEndDate).getTime() >= date.setHours(0, 0, 0, 0))
          continue;

        let colDates;

        let timelineCell = document.createElement("div");

        timelineCell.classList.add("zt-gantt-task-cell");

        if (this.options.zoomLevel !== "day") {
          colDates = this.initColSizes(this.options.zoomLevel, 1, date);
        } else {
          timelineCell.classList.add(
            options.weekends.includes(weekday[date.getDay()])
              ? "zt-gantt-weekend-cell"
              : "zt-gantt-weekday-cell",
            k == 0 ? "zt-gantt-border-left-none" : "zt-gantt-task-cell"
          );
        }

        //add custom classes from user
        this.addClassesFromFunction(
          this.templates.timeline_cell_class,
          timelineCell,
          dates[k]
        );

        if (this.options.zoomLevel !== "day") {
          if (this.options.zoomLevel === "hour") {
            timelineCell.style.left = rangeCount + "px";
            timelineCell.style.width = this.calculateGridWidth(date) + "px";
          } else {
            timelineCell.style.left = rangeCount + "px";
            timelineCell.style.width =
              colDates.dateCount.length * this.calculateGridWidth(date) + "px";
          }
        } else {
          timelineCell.style.left = this.calculateGridWidth(date) * k + "px";
          timelineCell.style.width = this.calculateGridWidth(date) + "px";
        }

        timelineCell.setAttribute(
          "zt-gantt-cell-date",
          this.formatDateToString(dateFormat, date)
        );

        let currentDate = new Date(date).setHours(0);

        if (this.options.zoomLevel === "hour") {
          let cellWidth = this.calculateGridWidth(date);
          const fragment = document.createDocumentFragment();
          for (let i = 0; i < 24; i++) {
            let hourCell = timelineCell.cloneNode(true);
            hourCell.style.left = rangeCount + "px";
            hourCell.style.width = cellWidth + "px";
            rangeCount += cellWidth;
            // timeLineRow.append(hourCell);
            fragment.appendChild(hourCell);
          }
          timeLineRow.append(fragment);
        } else if (
          this.options.zoomLevel !== "day" &&
          new Date(cellEndDate).getTime() < currentDate
        ) {
          rangeCount +=
            colDates.dateCount.length * this.calculateGridWidth(date);
          cellEndDate = new Date(colDates.endDate);
          timeLineRow.append(timelineCell);
        } else if (this.options.zoomLevel === "day") {
          timeLineRow.append(timelineCell);
        }
      }

      return timeLineRow;
    },

    // create taskBars
    createTaskBars: function (barContainer = null, isFromRender = false) {
      // if splitTask is true then run this.createSplitTask
      if (this.options.splitTask) {
        this.createSplitTask(barContainer, isFromRender);
        return;
      }

      let rowCount = 0;

      let ztGanttBarsArea = document.createElement("div");
      ztGanttBarsArea.classList.add("zt-gantt-bars-area");
      ztGanttBarsArea.id = "zt-gantt-bars-area";
      for (let j = 0; j < this.options.data.length; j++) {
        let start_date = new Date(this.options.data[j].start_date);
        let end_date = new Date(this.options.data[j].end_date);

        if (this.options.data[j].children?.length) {
          ({ start_date, end_date } = this.getLargeAndSmallDate(
            this.options.data[j]
          ));
        }

        let cellStartDate = this.options.startDate;
        let isCellGreater = true;
        let cellBefore = this.getDates(
          cellStartDate,
          this.options.data[j].type === "milestone"
            ? this.options.data[j].start_date
            : start_date
        );

        if (cellBefore.length === 0) {
          cellBefore = this.getDates(start_date, cellStartDate);
          isCellGreater = false;
        }

        if (!this.options.fullWeek) {
          cellBefore = this.filterWeekends(cellBefore);
        }

        if (isCellGreater) {
          cellBefore = cellBefore.length - 1;
        } else {
          cellBefore = -(cellBefore.length - 1);
        }
        let ztGanttBarTask = document.createElement("div");

        if (
          this.options.data[j].taskColor &&
          this.options.data[j].type !== "milestone"
        ) {
          ztGanttBarTask.style.setProperty(
            "background-color",
            this.changeOpacity(
              this.options.data[j].taskColor,
              this.options.taskOpacity
            ),
            "important"
          );
          ztGanttBarTask.style.setProperty(
            "border-color",
            this.options.data[j].taskColor,
            "important"
          );
        }

        if (this.options.data[j].type === "milestone") {
          ztGanttBarTask.classList.add(
            "zt-gantt-bar-task",
            "zt-gantt-bar-milestone",
            this.options.selectedTask === `${this.options.data[j].id}`
              ? "zt-gantt-selected-task-bar"
              : "zt-gantt-bar-milestone"
          );
        } else {
          ztGanttBarTask.classList.add(
            "zt-gantt-bar-task",
            "zt-gantt-bar-parent-task",
            this.options.selectedTask === `${this.options.data[j].id}`
              ? "zt-gantt-selected-task-bar"
              : "zt-gantt-bar-task"
          );
        }

        //add custom class from user
        this.addClassesFromFunction(
          this.templates.task_class,
          ztGanttBarTask,
          start_date,
          end_date,
          this.options.data[j]
        );

        ztGanttBarTask.setAttribute("task-parent", j);
        ztGanttBarTask.setAttribute("data-task-pos", 0);
        ztGanttBarTask.setAttribute(
          "zt-gantt-taskbar-id",
          this.options.data[j].id
        );

        let taskLeft = cellBefore * this.calculateGridWidth(start_date, "day");

        let hourLeft = this.getPxByTime(start_date, "left");
        taskLeft += hourLeft;

        ztGanttBarTask.style.left = taskLeft + "px";

        ztGanttBarTask.style.top =
          rowCount * this.options.row_height +
          Math.floor((this.options.row_height * 10) / 100) +
          "px";
        let barTaskHeight = Math.floor((this.options.row_height * 80) / 100);
        ztGanttBarTask.style.height = `${barTaskHeight}px`;
        ztGanttBarTask.style.lineHeight = `${barTaskHeight}px`;
        if (this.options.data[j].type === "milestone") {
          ztGanttBarTask.style.width = `${barTaskHeight}px`;
          ztGanttBarTask.style.left =
            (cellBefore + 1) * this.calculateGridWidth(start_date, "day") +
            "px";
        }

        let ztGanttBarTaskContent = document.createElement("div");
        ztGanttBarTaskContent.classList.add(
          "zt-gantt-bar-task-content",
          "parent-task-bar-content"
        );

        if (
          this.options.data[j].type === "milestone" &&
          this.options.data[j].taskColor
        ) {
          ztGanttBarTaskContent.style.setProperty(
            "background-color",
            this.options.data[j].taskColor,
            "important"
          );

          ztGanttBarTaskContent.style.setProperty(
            "border-color",
            this.options.data[j].taskColor,
            "important"
          );
        }

        let that = this;

        // handle double click event
        ztGanttBarTask.addEventListener("dblclick", handleDblClick);

        function handleDblClick(e) {
          // custom event handler
          that.dispatchEvent("onBeforeTaskDblClick", {
            task: that.options.data[j],
          });

          // if onBeforeTaskDblClick return false then do not drag the task
          if (that.eventValue === false) {
            that.eventValue = true;
            return;
          }

          that.dispatchEvent("onTaskDblClick", { task: that.options.data[j] });

          that.showLightBox(that.options.data[j]);
        }

        const userAgent = navigator.userAgent;

        // Handle mouseover event
        ztGanttBarTask.addEventListener("mouseover", handleMouseOver);

        function handleMouseOver(e) {
          if (/^((?!chrome|android).)*safari/i.test(userAgent)) {
            ztGanttBarTask.classList.add("hovered");
          }

          that.updateTooltipBody(that.options.data[j]);
        }

        // Handle mouseleave event
        ztGanttBarTask.addEventListener("mouseleave", handleMouseLeave);

        function handleMouseLeave(event) {
          if (/^((?!chrome|android).)*safari/i.test(userAgent)) {
            ztGanttBarTask.classList.remove("hovered");
          }

          that.hideTooltip();
        }

        if (
          this.templates.task_drag("resize", this.options.data[j]) &&
          this.options.data[j].type !== "milestone"
        ) {
          // left side resizer
          let ztGanttTaskDragLeft = document.createElement("div");
          ztGanttTaskDragLeft.classList.add("zt-gantt-task-drag-left");

          // right side resizer
          let ztGanttTaskDragRight = document.createElement("div");
          ztGanttTaskDragRight.classList.add("zt-gantt-task-drag-right");

          ztGanttBarTask.append(ztGanttTaskDragLeft, ztGanttTaskDragRight);
          this.resizeTaskBars(
            ztGanttTaskDragLeft,
            ztGanttBarTask,
            "left",
            this.options.data[j]
          );
          this.resizeTaskBars(
            ztGanttTaskDragRight,
            ztGanttBarTask,
            "right",
            this.options.data[j]
          );
        }

        let taskDates = this.getDates(start_date, end_date);

        if (!this.options.fullWeek) {
          taskDates = this.filterWeekends(taskDates);
        }

        let taskProgress;
        if (
          this.options.taskProgress === true &&
          this.options.data[j].type !== "milestone"
        ) {
          let progressPer = this.options.data[j].progress || 0;
          let taskProgressContainer = document.createElement("div");
          taskProgressContainer.classList.add("zt-gantt-task-progress-wrapper");
          taskProgress = document.createElement("div");
          taskProgress.classList.add("zt-gantt-task-progress");
          taskProgress.style.width = `${
            progressPer > 100 ? 100 : progressPer
          }%`;

          if (this.options.data[j].taskColor) {
            taskProgress.style.setProperty(
              "background-color",
              this.options.data[j].taskColor,
              "important"
            );
          }

          taskProgressContainer.append(taskProgress);

          let taskProgressDrag = document.createElement("div");
          taskProgressDrag.classList.add("zt-gantt-task-progress-drag");
          taskProgressDrag.style.left = `${
            progressPer > 100 ? 100 : progressPer
          }%`;

          // update the task progress onAfterTaskUpdate
          this.attachEvent("onAfterTaskUpdate", () => {
            let progress =
              progressPer > 100 ? 100 : this.options.data[j].progress || 0;
            taskProgress.style.width = `${progress}%`;

            taskProgressDrag.style.left = `${progress}%`;
          });

          ztGanttBarTask.append(taskProgressContainer, taskProgressDrag);
          this.dragTaskProgress(
            taskProgressDrag,
            taskProgress,
            ztGanttBarTask,
            this.options.data[j]
          );
        }

        if (this.templates.task_drag("move", this.options.data[j])) {
          this.resizeTaskBars(
            ztGanttBarTaskContent,
            ztGanttBarTask,
            "move",
            this.options.data[j]
          );
        }

        // link control pointers
        let isAddLinks = this.isFunction(this.options.addLinks)
          ? this.options.addLinks(this.options.data[j])
          : this.options.addLinks;

        if (isAddLinks === true) {
          // left point
          let leftLinkPoint = document.createElement("div");
          leftLinkPoint.classList.add(
            "zt-gantt-link-control",
            "zt-gantt-left-point"
          );
          let leftPoint = document.createElement("div");
          leftPoint.classList.add("zt-gantt-link-point");

          // right point
          let rightLinkPoint = document.createElement("div");
          rightLinkPoint.classList.add(
            "zt-gantt-link-control",
            "zt-gantt-right-point"
          );
          let rightPoint = document.createElement("div");
          rightPoint.classList.add("zt-gantt-link-point");

          leftLinkPoint.append(leftPoint);
          rightLinkPoint.append(rightPoint);
          ztGanttBarTask.append(leftLinkPoint, rightLinkPoint);

          this.createNewLink(
            rightPoint,
            ztGanttBarTask,
            this.options.data[j].id,
            "right"
          );
          this.createNewLink(
            leftPoint,
            ztGanttBarTask,
            this.options.data[j].id,
            "left"
          );
        }

        //add custom task color picker
        let isCustomColor = this.isFunction(this.options.taskColor)
          ? this.options.taskColor(this.options.data[j])
          : this.options.taskColor;

        if (isCustomColor) {
          let colorPicker = document.createElement("div");
          colorPicker.classList.add("zt-gantt-task-color-picker");
          let colorInput = document.createElement("input");
          colorInput.type = "color";

          setTimeout(() => {
            const backgroundElement =
              this.options.data[j].type === "milestone"
                ? ztGanttBarTaskContent
                : ztGanttBarTask;
            // Get the computed style of the element
            const ztGanttBarTaskStyle =
              window.getComputedStyle(backgroundElement);
            // Get the background-color property value
            const backgroundColor =
              ztGanttBarTaskStyle.getPropertyValue("background-color");
            colorInput.value =
              this.options.data[j].taskColor || this.rgbaToHex(backgroundColor);
          }, 0);

          colorPicker.append(colorInput);
          ztGanttBarTask.append(colorPicker);
          this.changeTaskbarColor(
            ztGanttBarTask,
            colorInput,
            taskProgress,
            ztGanttBarTaskContent,
            this.options.data[j]
          );
        }

        if (this.options.data[j].type !== "milestone") {
          let taskWidth =
            taskDates.length * this.calculateGridWidth(end_date, "day");

          if (taskWidth === 0 || !taskWidth) {
            ztGanttBarTask.classList.add("zt-gantt-d-none");
          }

          let hourWidth = this.getPxByTime(end_date, "width");
          let hourLeft = this.getPxByTime(start_date, "left");
          hourWidth += hourLeft;
          taskWidth -= hourWidth;
          ztGanttBarTask.style.width = taskWidth + "px";
        }

        if (this.options.data[j].type === "milestone") {
          sideContent = document.createElement("div");
          sideContent.classList.add("zt-gantt-side-content");
          sideContent.innerHTML = this.templates.taskbar_text(
            new Date(start_date),
            new Date(end_date),
            this.options.data[j]
          );
          ztGanttBarTask.append(sideContent);
        } else {
          ztGanttBarTaskContent.innerHTML = this.templates.taskbar_text(
            new Date(start_date.setHours(0)),
            new Date(end_date.setHours(0)),
            this.options.data[j]
          );
        }
        ztGanttBarTask.append(ztGanttBarTaskContent);

        this.attachEvent("onAfterTaskUpdate", (event) => {
          if (this.options.data[j].type === "milestone") {
            sideContent.innerHTML = this.templates.taskbar_text(
              start_date.setHours(0),
              end_date.setHours(0),
              this.options.data[j]
            );
          } else {
            ztGanttBarTaskContent.innerHTML = this.templates.taskbar_text(
              start_date.setHours(0),
              end_date.setHours(0),
              this.options.data[j]
            );
          }
        });

        let isTaskExist = this.getTask(
          this.options.data[j].id,
          this.searchedData
        );
        if (!this.searchedData || isTaskExist) {
          ztGanttBarsArea.append(ztGanttBarTask);
        }

        if (!this.searchedData || isTaskExist) {
          rowCount += 1;
        }

        // if children exist
        if (
          this.options.data[j].children &&
          this.options.openedTasks.includes(this.options.data[j].id) &&
          !this.options.splitTask
        ) {
          rowCount = this.createChildTaskBars(
            this.options.data[j].children,
            rowCount,
            cellStartDate,
            ztGanttBarsArea,
            j
          );
        }
      }

      const barsArea = document.getElementById("zt-gantt-bars-area");

      if (barContainer === null) {
        barContainer = document.getElementById("zt-gantt-scale-data");
      }

      // if barsArea exist then remove barsArea
      if (barsArea && !isFromRender) {
        barsArea.replaceWith(ztGanttBarsArea);
      } else {
        barContainer.append(ztGanttBarsArea);
      }
      if (!isFromRender) {
        // create links if addLinks is true
        let isLinksAreaExist = document.querySelector("#zt-gantt-links-area");
        // if lines already exist remove all lines
        if (isLinksAreaExist) {
          isLinksAreaExist.innerHTML = "";
        } else if (barContainer) {
          let linksArea = document.createElement("div");
          linksArea.classList.add("zt-gantt-links-area");
          linksArea.id = "zt-gantt-links-area";
          barContainer.append(linksArea);
        }

        for (let i = 0; i < this.options.links.length; i++) {
          this.createLinks(
            this.options.links[i].source,
            this.options.links[i].target,
            this.options.links[i]
          );
        }
      }
    },

    // get week startDate and endDate
    getWeekStartEndDate: function (weekDate) {
      const date = new Date(weekDate);
      const start = new Date(
        date.setDate(
          date.getDate() - Math.abs(date.getDay() - this.options.weekStart)
        )
      );
      const end = new Date(
        date.setDate(
          date.getDate() - date.getDay() + (6 + this.options.weekStart)
        )
      );

      // Return the start and end dates
      return {
        start: start,
        end: end,
      };
    },

    // add click listner function
    addClickListener: function (element, callback) {
      element.addEventListener("click", callback);
    },

    // resize columns function
    resizeColumns: function (
      resizer,
      attr,
      headCell,
      headCellContainer,
      minWidth,
      maxWidth,
      columnIndex,
      sidebar,
      isRight
    ) {
      let colResizing = false,
        resizeArea,
        that = this,
        startX;

      resizer.removeEventListener("mousedown", handleMouseDown);
      resizer.addEventListener("mousedown", handleMouseDown);

      function handleMouseDown(event) {
        startX = event.x;
        resizeArea = document.createElement("div");
        resizeArea.classList.add("zt-gantt-grid-resize-area");
        resizeArea.id = "zt-gantt-resize-area";
        let resizeLeft = sidebar.offsetLeft + headCell.offsetLeft;

        resizeArea.style.left = resizeLeft + "px";

        const ztGanttLayout = document.getElementById("zt-gantt-layout");

        resizeArea.style.height = ztGanttLayout.scrollHeight + "px";

        let resizeAreaWidth = headCell.offsetWidth;

        resizeArea.style.width =
          (resizeAreaWidth < (minWidth || 80)
            ? minWidth || 80
            : resizeAreaWidth > maxWidth
            ? maxWidth
            : resizeAreaWidth) + "px";

        ztGanttLayout.append(resizeArea);
        document.addEventListener("mousemove", resize, false);
        document.addEventListener("mouseup", handleMouseUp, false);
      }

      function handleMouseUp(e) {
        document.removeEventListener("mousemove", resize, false);
        document.removeEventListener("mouseup", handleMouseUp, false);
        resizeArea.remove();
        if (colResizing) {
          let columns = document.querySelectorAll(`[${attr}]`);
          let colWidth = columns[0].offsetWidth + (e.x - startX);
          colWidth =
            colWidth < (minWidth || 80)
              ? minWidth || 80
              : colWidth > maxWidth
              ? maxWidth
              : colWidth;
          for (let col of columns) {
            col.style.width = colWidth + "px";
          }

          if (!isRight) {
            that.options.columns[columnIndex].width = colWidth;
          } else {
            that.options.rightGrid[columnIndex].width = colWidth;
          }

          let headerCell = document.getElementsByClassName(
            isRight ? "right-head-cell" : "head-cell"
          );
          const totalHeadWidth = Array.from(headerCell).reduce(
            (totalWidth, headCell) => totalWidth + headCell.offsetWidth,
            0
          );
          if (!isRight) {
            const sidebar = document.getElementById("zt-gantt-grid-left-data");
            sidebar.style.width = totalHeadWidth + 1 + "px";
            sidebar.style.minWidth = totalHeadWidth + 1 + "px";

            that.options.sidebarWidth = sidebar.offsetWidth;
          }

          let resizerLeft = 0;
          for (let j = 0; j < headerCell.length; j++) {
            resizerLeft += headerCell[j].offsetWidth;
            let resizerWrap;
            if (!isRight) {
              resizerWrap = document.getElementById(
                `zt-gantt-col-resizer-wrap-${j}`
              );
            } else {
              resizerWrap = document.getElementById(
                `zt-gantt-col-resizer-wrap-r-${j}`
              );
            }
            if (resizerWrap) {
              resizerWrap.style.left = resizerLeft + "px";
            }
          }

          if (!isRight) {
            headCellContainer.style.width = resizerLeft + "px";
            document.getElementById("zt-gantt-left-grid").style.width =
              resizerLeft + "px";
            document.getElementById(
              "zt-gantt-left-layout-resizer-wrap"
            ).style.left =
              document.getElementById("zt-gantt-grid-left-data").offsetWidth +
              "px";
          } else {
            let rightResizer = document.querySelector(
              "#zt-gantt-timeline-resizer-wrap"
            );
            headCellContainer.style.width = totalHeadWidth + "px";
            sidebar.style.width = totalHeadWidth + "px";
            sidebar.style.minWidth = totalHeadWidth + "px";
            sidebar.style.width = totalHeadWidth + "px";
            let resizerLeft = sidebar.offsetLeft - rightResizer.offsetLeft;
            rightResizer.style.left =
              rightResizer.offsetLeft + resizerLeft + "px";
            that.options.rightGridWidth = sidebar.offsetWidth;
          }
          // rerender the calendar and scale
          if (
            that.calculateTimeLineWidth("updated") !==
            that.calculateTimeLineWidth("current")
          ) {
            that.updateBody();
          } else {
            let mainContainer = document.querySelector(".zt-gantt-layout");
            that.createScrollbar(mainContainer, that.options);
          }
        }
        colResizing = false;
      }

      // resize the column
      function resize(e) {
        colResizing = true;
        let newWidth = headCell.offsetWidth + (e.x - startX);
        if (newWidth <= (minWidth || 80)) {
          resizeArea.style.width = (minWidth || 80) + "px";
          return;
        } else if (newWidth >= maxWidth) {
          resizeArea.style.width = maxWidth + "px";
          return;
        }

        document.getElementById("zt-gantt-resize-area").style.width =
          newWidth + "px";
      }
    },

    // resize sidebar function
    resizeSidebar: function (resizer, resizerLine, sidebar) {
      let sidebarResizing = false,
        that = this,
        startX,
        sidebarStartWidth;

      resizer.removeEventListener("mousedown", handleMouseDown);
      resizer.addEventListener("mousedown", handleMouseDown);

      function handleMouseDown(event) {
        startX = event.x;
        sidebarStartWidth = sidebar.offsetWidth;
        resizerLine.style.backgroundColor = "#218eed";

        // mouse move event
        document.addEventListener("mousemove", resize, false);
        // mouseup event
        document.addEventListener("mouseup", handleMouseUp, false);
      }

      function handleMouseUp(e) {
        document.removeEventListener("mousemove", resize, false);
        document.removeEventListener("mouseup", handleMouseUp, false);
        if (sidebarResizing) {
          let rightResizer = document.querySelector(
            "#zt-gantt-timeline-resizer-wrap"
          );
          // add the all columns minWidth
          const totalMinWidth = that.options.columns.reduce(
            (totalMinWidth, column) => totalMinWidth + column.min_width,
            0
          );

          let left = e.x;
          if (rightResizer) {
            let x = e.x;
            x =
              rightResizer.offsetLeft - 80 <= resizer.offsetLeft
                ? rightResizer.offsetLeft - resizer.offsetLeft
                : 80;

            left = e.x - (80 - x);
          }

          let resizerLeft = 0,
            headerCell = document.getElementsByClassName("head-cell"),
            sidebarData = document.querySelector("#zt-gantt-left-grid");

          if (that.element.offsetWidth - left <= 50) {
            left -= 50;
          }

          let singleColIncrease = (left - startX) / that.options.columns.length;

          for (let j = 0; j < headerCell.length; j++) {
            let columns = document.querySelectorAll(
              `[data-column-index="${j}"]`
            );

            let incrasedWidth = headerCell[j].offsetWidth + singleColIncrease;

            let resizerWrap = document.getElementById(
              `zt-gantt-col-resizer-wrap-${j}`
            );

            incrasedWidth =
              incrasedWidth > (that.options.columns[j].min_width || 80)
                ? incrasedWidth
                : that.options.columns[j].min_width || 80;

            // set the sidebar columns width
            for (let col of columns) {
              col.style.width = incrasedWidth + "px";
            }

            that.options.columns[j].width = incrasedWidth;

            // set the sidebar columns resizer left
            resizerLeft += headerCell[j].offsetWidth;
            if (resizerWrap) {
              resizerWrap.style.left = resizerLeft + "px";
            }
          }

          const totalHeadWidth = Array.from(headerCell).reduce(
            (totalWidth, headCell) => totalWidth + headCell.offsetWidth,
            0
          );

          // set the sidebar width
          let sidebarWidth = totalHeadWidth;

          sidebar.style.width =
            (sidebarWidth < totalMinWidth ? totalMinWidth : sidebarWidth) +
            "px";
          sidebar.style.minWidth =
            (sidebarWidth < totalMinWidth ? totalMinWidth : sidebarWidth) +
            "px";
          resizer.style.left =
            (sidebarWidth < totalMinWidth ? totalMinWidth : sidebarWidth) +
            "px";

          that.options.sidebarWidth = sidebar.offsetWidth;

          // set the sidebar header and body width
          sidebarData.style.width = sidebar.offsetWidth + "px";

          // rerender the calendar and scale

          if (
            that.calculateTimeLineWidth("updated") !==
            that.calculateTimeLineWidth("current")
          ) {
            that.updateBody();
          } else {
            let mainContainer = document.querySelector(".zt-gantt-layout");
            that.createScrollbar(mainContainer, that.options);
          }
        }
        resizerLine.style.backgroundColor = "#cecece";
        sidebarResizing = false;
      }

      // resize the sidebar
      function resize(e) {
        sidebarResizing = true;
        let size = sidebarStartWidth + (e.x - startX);
        if (that.element.offsetWidth - size <= 50) return;
        resizer.style.left = `${size}px`;
      }
    },

    // add today flag
    addTodayFlag: function () {
      // return from here if current date is out of range
      if (this.outOfGanttRange(new Date())) return;

      const isFullWeek = this.options.fullWeek;
      isWeekend = this.options.weekends.includes(this.options.dateFormat.day_short[new Date().getDay()])
      
      if (!isFullWeek && isWeekend) return;

      let isTodayExist = document.getElementById("zt-gantt-marker-today");
      if (!isTodayExist) {
        let todayFlag = document.createElement("div");
        todayFlag.classList.add("zt-gantt-marker-today");
        todayFlag.id = "zt-gantt-marker-today";
        todayFlag.title = this.formatDateToString("%d %F %Y", new Date());
        let todayFlagText = document.createElement("div");
        todayFlagText.classList.add("zt-gantt-marker-today-text");
        todayFlagText.innerHTML = "Today";
        todayFlag.append(todayFlagText);

        // Calculate the difference in days
        let daysDiff = this.getDates(
          new Date(this.options.startDate),
          new Date()
        );

        if (!isFullWeek) {
          daysDiff = this.filterWeekends(daysDiff);
        }

        daysDiff = daysDiff.length - 1 || 0;

        let colWidth = this.calculateGridWidth(new Date(), "day");
        todayFlag.style.left = colWidth * daysDiff + colWidth / 2 + "px";

        this.markerArea.append(todayFlag);
          
      }
    },

    // remove today flag
    removeTodayFlag: function () {
      let today = document.getElementById("zt-gantt-marker-today");
      if (today) {
        today.remove();
      }
    },

    // format date into given format
    formatDateToString: function (format, date) {
      let dateFormat = this.options.currentLanguage;
      date = new Date(date);
      let that = this;
      return format.replace(/%[a-zA-Z]/g, function (format) {
        switch (format) {
          case "%d":
            return toFixed(date.getDate());
          case "%m":
            return toFixed(date.getMonth() + 1);
          case "%q":
            return that.getQuarterOfDate(date);
          case "%j":
            return date.getDate();
          case "%n":
            return date.getMonth() + 1;
          case "%y":
            return toFixed(date.getFullYear() % 100);
          case "%Y":
            return date.getFullYear();
          case "%D":
            return dateFormat.day_short[date.getDay()];
          case "%l":
            return dateFormat.day_full[date.getDay()];
          case "%M":
            return dateFormat.month_short[date.getMonth()];
          case "%F":
            return dateFormat.month_full[date.getMonth()];
          case "%h":
            return toFixed(((date.getHours() + 11) % 12) + 1);
          case "%g":
            return ((date.getHours() + 11) % 12) + 1;
          case "%G":
            return date.getHours();
          case "%H":
            return toFixed(date.getHours());
          case "%i":
            return toFixed(date.getMinutes());
          case "%a":
            return date.getHours() > 11 ? "pm" : "am";
          case "%A":
            return date.getHours() > 11 ? "PM" : "AM";
          case "%s":
            return toFixed(date.getSeconds());
          case "%W":
            return toFixed(_getWeekNumber(date));
          default:
            return format;
        }
      });
      function toFixed(t) {
        return t < 10 ? "0" + t : t;
      }

      // get week number
      function _getWeekNumber(t) {
        if (!t) return !1;
        let n = t.getDay();
        0 === n && (n = 7);
        let i = new Date(t.valueOf());
        i.setDate(t.getDate() + (4 - n));
        let r = i.getFullYear(),
          a = Math.round((i.getTime() - new Date(r, 0, 1).getTime()) / 864e5);
        return 1 + Math.floor(a / 7);
      }
    },

    // add days in date
    add: function (t, e, n) {
      let i = new Date(t.valueOf());
      switch (n) {
        case "day":
          i = this._add_days(i, e, t);
          break;
        case "week":
          i = this._add_days(i, 7 * e, t);
          break;
        case "month":
          i.setMonth(i.getMonth() + e);
          break;
        case "year":
          i.setYear(i.getFullYear() + e);
          break;
        case "hour":
          i.setTime(i.getTime() + 60 * e * 60 * 1e3);
          break;
        case "minute":
          i.setTime(i.getTime() + 60 * e * 1e3);
          break;
        default:
          return this["add_" + n](t, e, n);
      }
      return i;
    },

    // add days in date
    _add_days: function (t, e, n) {
      t.setDate(t.getDate() + e);
      let i = e >= 0,
        r = !n.getHours() && t.getHours(),
        a =
          t.getDate() <= n.getDate() ||
          t.getMonth() < n.getMonth() ||
          t.getFullYear() < n.getFullYear();
      return (
        i && r && a && t.setTime(t.getTime() + 36e5 * (24 - t.getHours())), t
      );
    },

    // Function to strip time from date
    stripTime: function (date) {
      const dateOnly = new Date(date);
      dateOnly.setHours(0, 0, 0, 0);
      return dateOnly;
    },

    // request browser fullscreen
    requestFullScreen: function () {
      const sidebar = document.getElementById("zt-gantt-grid-left-data");
      const resizer = document.getElementById(
        "zt-gantt-left-layout-resizer-wrap"
      );

      document.body.requestFullscreen?.() ||
        // For Firefox
        document.body.mozRequestFullScreen?.() ||
        // For Chrome and Safari
        document.body.webkitRequestFullscreen?.() ||
        // For Internet Explorer
        document.body.msRequestFullscreen?.();
      this.element.classList.add("zt-gantt-fullScreen");

      this.fullScreen = true;
      let isVerScrollExist = document.querySelectorAll(
        ".zt-gantt-ver-scroll-cell"
      );
      if (isVerScrollExist && isVerScrollExist.length > 0) {
        for (let scroll of isVerScrollExist) {
          scroll.remove();
        }
      }

      this.dispatchEvent("onExpand", { type: "requestFullScreen" });

      if (
        this.calculateTimeLineWidth("updated") !==
        this.calculateTimeLineWidth("current")
      ) {
        this.updateBody();
      } else {
        let mainContainer = document.querySelector(".zt-gantt-layout");
        let verScroll =
          document.querySelector(".zt-gantt-ver-scroll")?.scrollTop || 0;
        let horScroll =
          document.querySelector(".zt-gantt-hor-scroll")?.scrollLeft || 0;
        this.createScrollbar(mainContainer, this.options, verScroll, horScroll);
      }
      resizer.style.left = sidebar.offsetWidth + "px";
    },

    // exit browser fullscreen
    exitFullScreen: function (listener = false) {
      if (this.fullScreen !== true) {
        return;
      }
      this.element.classList.remove("zt-gantt-fullScreen");
      if (listener !== true) {
        document.body.exitFullscreen?.() ||
          // For Firefox
          document.body.mozCancelFullScreen?.() ||
          // For Chrome and Safari
          document.body.webkitExitFullscreen?.() ||
          // For Internet Explorer
          document.body.msExitFullscreen?.();
      }

      this.fullScreen = false;

      let isVerScrollExist = document.querySelectorAll(
        ".zt-gantt-ver-scroll-cell"
      );

      if (isVerScrollExist) {
        for (let scroll of isVerScrollExist) {
          scroll.remove();
        }
      }

      if (
        this.calculateTimeLineWidth("updated") !==
        this.calculateTimeLineWidth("current")
      ) {
        setTimeout(() => {
          this.updateBody();
        }, 0);
      } else {
        let mainContainer = document.querySelector(".zt-gantt-layout");
        this.createScrollbar(mainContainer, this.options);
      }

      // manage tooltip
      this.hideTooltip();

      // handle custom event
      this.dispatchEvent("onCollapse", { type: "exitFullScreen" });
    },

    // expand all tree
    expandAll: function () {
      const childRows = document.querySelectorAll(".zt-gantt-child-row");
      const toggleIcons = document.querySelectorAll(".zt-gantt-tree-close");

      let openedTasks = this.setAllExpand(this.options.data, []);

      for (let icon of toggleIcons) {
        icon.classList.remove("zt-gantt-tree-close");
        icon.classList.add("zt-gantt-tree-open");
      }

      for (let row of childRows) {
        if (row.classList.contains("zt-gantt-d-none")) {
          row.classList.add("zt-gantt-d-flex");
          row.classList.remove("zt-gantt-d-none");
        }
      }

      this.options.openedTasks = openedTasks;
      this.createTaskBars();
      let mainContainer = document.querySelector("#zt-gantt-layout");
      this.createScrollbar(mainContainer, this.options);
      this.options.collapse = false;
    },

    // collapse all tree
    collapseAll: function () {
      const childRows = document.querySelectorAll(".zt-gantt-child-row");
      const toggleIcons = document.querySelectorAll(".zt-gantt-tree-icon");

      // Make the opened task array empty
      this.options.openedTasks = [];

      // Change all the toggle icons to close
      for (let icon of toggleIcons) {
        icon.classList.remove("zt-gantt-tree-open");
        icon.classList.add("zt-gantt-tree-close");
      }

      // Hide all the child rows
      for (let row of childRows) {
        row.classList.add("zt-gantt-d-none");
        row.classList.remove("zt-gantt-d-flex");
      }

      // Again create all taskBars
      this.createTaskBars();
      let mainContainer = document.querySelector("#zt-gantt-layout");
      this.createScrollbar(mainContainer, this.options);
      this.options.collapse = true;
    },

    // get start and end dates from children array
    getStartAndEndDate: function (data) {
      function getDates(array) {
        let dates = [];
        array.forEach((item) => {
          if (Array.isArray(item.children) && item.children.length > 0) {
            dates = dates.concat(getDates(item.children));
          }
          if (
            item.hasOwnProperty("start_date") &&
            item.hasOwnProperty("end_date")
          ) {
            dates.push(new Date(item.start_date));
            dates.push(new Date(item.end_date || item.start_date));
          }
        });
        return dates;
      }

      // get lowest and highest dates
      const dateValues = getDates(data);
      const lowestDate = new Date(Math.min(...dateValues));
      const highestDate = new Date(Math.max(...dateValues));

      return { startDate: lowestDate, endDate: highestDate };
    },

    // resize or move Task Bars
    resizeTaskBars: function (resizer, taskBar, type, task) {
      let startX,
        startY,
        startWidth,
        startLeft,
        startTop,
        that = this,
        rightPanelScroll,
        rightPanelScrollWidth,
        resizeTask = false,
        startRightPanelScrollLeft,
        startRightPanelScrollTop,
        autoScroll = false,
        originalTask,
        initStartDate,
        initEndDate,
        scrollSpeed = 5,
        willRender = false;

      resizer.removeEventListener("mousedown", handleMouseDown);
      resizer.addEventListener("mousedown", handleMouseDown);

      function handleMouseDown(event) {
        rightPanelScroll = document.getElementById("zt-gantt-right-cell");
        rightPanelScrollWidth = rightPanelScroll.scrollWidth;
        initStartDate = task.start_date;
        initEndDate = task.end_date;
        startRightPanelScrollLeft = rightPanelScroll.scrollLeft;
        startRightPanelScrollTop = rightPanelScroll.scrollTop;
        startX = event.x;
        startY = event.y;
        startWidth = taskBar.offsetWidth;
        startLeft = taskBar.offsetLeft;
        startTop = taskBar.offsetTop;
        originalTask = { ...task };

        document.addEventListener("mousemove", resize, false);
        document.addEventListener("mouseup", handleMouseUp, false);
      }

      function handleMouseUp(e) {
        autoScroll = false;
        taskBar.classList.remove("task-dragging");
        document.removeEventListener("mousemove", resize, false);
        document.removeEventListener("mouseup", handleMouseUp, false);

        if (resizeTask === true) {
          let parentTask;
          let top = taskBar.offsetTop;
          let taskId = Math.floor(top / that.options.row_height);
          let allTaskbars = document.querySelectorAll(".zt-gantt-bar-task");
          let taskParentId = allTaskbars[taskId]?.getAttribute("task-parent");
          let taskPosition =
            +allTaskbars[taskId]?.getAttribute("data-task-pos");
          let taskPositionId = allTaskbars[taskId]?.getAttribute(
            "zt-gantt-taskbar-id"
          );
          let currentTaskParentId = taskBar.getAttribute("task-parent");
          let currentTaskPosition = +taskBar.getAttribute("data-task-pos");

          const updateData = (parentId, task, taskPositionId) => {
            let currentIndex = that.originalData.findIndex(
              (obj) => obj.id == task.id
            );
            let newIndexTask = that.getTask(taskPositionId);
            let newIndex = that.originalData.findIndex(
              (obj) => obj.id == taskPositionId
            );

            that.originalData.splice(currentIndex, 1); // Remove the object from the current position
            task.parent =
              parentId.length > 1 ? newIndexTask.parent : newIndexTask.id;
            that.originalData.splice(newIndex, 0, task); // Insert the object at the new position
          };

          if (taskId > -1 && taskId < allTaskbars.length) {
            let currentTask = that.getTask(taskPositionId);
            parentId =
              taskParentId.length > 1 ? currentTask.parent : currentTask.id;
            parentTask = that.getTask(parentId);
          } else {
            parentTask = null;
          }

          // handle custom event
          that.dispatchEvent("onBeforeTaskDrop", {
            task,
            mode: type === "move" ? "move" : "resize",
            parentTask: parentTask,
            oldParentTask: that.getTask(task.parent),
          });

          if (type === "move" && that.eventValue === false) {
            taskBar.style.top = startTop + "px";
            taskBar.style.left = startLeft + "px";
            resizer.style.cursor = "pointer";
            that.updateTask(task, initStartDate, initEndDate, taskBar);
            resizeTask = false;
            that.eventValue = true;
          } else {
            if (type === "move") {
              resizer.style.cursor = "pointer";

              // if current task position or task parent is not same
              // update the task position in array
              if (
                (taskParentId !== currentTaskParentId ||
                  taskPosition !== currentTaskPosition) &&
                taskId > -1 &&
                taskId < allTaskbars.length &&
                taskParentId !==
                  currentTaskParentId.slice(
                    0,
                    currentTaskParentId.length - 1
                  ) &&
                !that.options.splitTask
              ) {
                updateData(taskParentId, task, taskPositionId);
                willRender = true;
              } else {
                taskBar.style.top = startTop + "px";
              }
            }

            const gridWidth = that.calculateGridWidth(
              task.start_date,
              that.options.zoomLevel !== "hour" ? "day" : ""
            );

            // set the left and width to whole column
            taskBar.style.left =
              Math.round(taskBar.offsetLeft / gridWidth) * gridWidth + "px";
            if (type !== "move") {
              taskBar.style.width =
                Math.round(taskBar.offsetWidth / gridWidth) * gridWidth + "px";
            }
          }
          if (task.type === "milestone") {
            task.end_date = new Date(task.start_date).setHours(23, 59, 59);
          }

          that.updateTask(
            task,
            task.start_date,
            task.end_date,
            taskBar,
            "mouseup"
          );

          if (willRender) {
            // render the chart again
            that.render();
            willRender = false;
          }

          // handle custom event
          that.dispatchEvent("onAfterTaskDrag", {
            task,
            mode: type === "move" ? "move" : "resize",
            parentTask: that.getTask(task.parent),
          });
        }
        resizeTask = false;
      }

      // resize the taskBar
      function resize(e) {
        if (resizeTask === false) {
          // custom event handler
          that.dispatchEvent("onBeforeTaskDrag", {
            task,
            mode: type === "move" ? "move" : "resize",
          });
        }

        resizeTask = true;

        // if onBeforeTaskDrag return false then do not drag the task
        if (that.eventValue === false) {
          return;
        }

        function startAutoScroll(type) {
          if (type === "right") {
            rightPanelScroll.scrollLeft += scrollSpeed;
            if (
              rightPanelScroll.scrollLeft >=
              rightPanelScroll.scrollWidth - rightPanelScroll.clientWidth
            ) {
              autoScroll = false;
              return;
            }
          } else if (type === "left") {
            rightPanelScroll.scrollLeft -= scrollSpeed;
            if (rightPanelScroll.scrollLeft <= 0) {
              autoScroll = false;
              return;
            }
          } else if (type === "top") {
            rightPanelScroll.scrollTop += scrollSpeed;
            if (rightPanelScroll.scrollTop <= 0) {
              autoScroll = false;
              return;
            }
          } else if (type === "bottom") {
            rightPanelScroll.scrollTop -= scrollSpeed;
            if (
              rightPanelScroll.scrollTop >=
              rightPanelScroll.scrollHeight - rightPanelScroll.clientHeight
            ) {
              autoScroll = false;
              return;
            }
          }
          if (autoScroll) {
            setTimeout(() => {
              startAutoScroll(type);
            }, 50); // Adjust the scroll delay by changing the value here
          }
        }

        const scrollContainer =
          that.element.offsetLeft + rightPanelScroll.offsetLeft;
        const scrollThresholdRight =
          scrollContainer + rightPanelScroll.offsetWidth - 30;
        const scrollThresholdLeft = scrollContainer + 30;

        // auto scroll the div left and right
        if (e.clientX > scrollThresholdRight - window.scrollX) {
          autoScroll = true;
          startAutoScroll("right");
        } else if (e.clientX < scrollThresholdLeft - window.scrollX) {
          autoScroll = true;
          startAutoScroll("left");
        } else {
          autoScroll = false;
        }

        const scrollContainerTop =
          that.element.offsetTop + rightPanelScroll.offsetHeight;
        const scrollThresholdTop = scrollContainerTop - 30;
        const scrollThresholdBottom =
          that.element.offsetTop +
          that.calculateScaleHeight(
            that.options.scales,
            that.options.scale_height,
            "scroll",
            0
          ) +
          30;

        // auto scroll the div top and bottom
        if (e.clientY > scrollThresholdTop - window.scrollY) {
          autoScroll = true;
          startAutoScroll("top");
        } else if (e.clientY < scrollThresholdBottom - window.scrollY) {
          autoScroll = true;
          startAutoScroll("bottom");
        }

        // move the taskbar
        if (type === "move") {
          resizer.style.cursor = "move";
          let left =
            startLeft +
            (e.x - startX) -
            (startRightPanelScrollLeft - rightPanelScroll.scrollLeft);

          taskBar.style.left = left + "px";
          if (!that.options.splitTask) {
            taskBar.style.top =
              startTop +
              (e.y - startY) -
              (startRightPanelScrollTop - rightPanelScroll.scrollTop) +
              "px";
          }
          taskBar.classList.add("task-dragging");

          let taskStartDate =
            that.dates[
              Math.round(
                taskBar.offsetLeft /
                  that.calculateGridWidth(task.start_date, "day")
              ) - (task.type === "milestone" ? 1 : 0)
            ];

          let taskEndDate =
            that.dates[
              Math.round(
                (taskBar.offsetLeft + taskBar.offsetWidth) /
                  that.calculateGridWidth(task.start_date, "day")
              ) - 1
            ];

          // if taskStartDate is less than the gantt range
          if (!taskStartDate) {
            let dateDiff = Math.round(
              taskBar.offsetLeft /
                that.calculateGridWidth(task.start_date, "day")
            );
            taskStartDate = that.add(new Date(that.dates[0]), dateDiff, "day");
          }

          // if taskEndDate is greater than the gantt range
          if (!taskEndDate) {
            let dateDiff =
              Math.round(
                (taskBar.offsetLeft + taskBar.offsetWidth) /
                  that.calculateGridWidth(task.start_date)
              ) - that.dates.length;
            taskEndDate = that.add(
              new Date(that.dates[that.dates.length - 1]),
              dateDiff,
              "day"
            );
          }

          // emmit event of moveTask
          that.dispatchEvent("onTaskDrag", {
            originalTask,
            task,
            mode: "move",
          });

          that.updateTask(
            task,
            new Date(taskStartDate),
            new Date(taskEndDate),
            taskBar
          );
          return;
        }

        let size, left;
        // drag taskbar left right
        if (type === "left") {
          size =
            startWidth -
            (e.x - startX) +
            (startRightPanelScrollLeft - rightPanelScroll.scrollLeft);
          left =
            startLeft +
            (e.x - startX) -
            (startRightPanelScrollLeft - rightPanelScroll.scrollLeft);
          if (
            size <= that.calculateGridWidth(task.start_date, "day") ||
            left <= 0
          ) {
            return;
          } else {
            taskBar.style.left = left + "px";
            taskBar.style.width = size + "px";
          }
        } else {
          size =
            startWidth +
            (e.x - startX) -
            (startRightPanelScrollLeft - rightPanelScroll.scrollLeft);
          // return if taskBar at start, end or width is 1 or less
          if (
            size <= that.calculateGridWidth(task.start_date, "day") ||
            taskBar.offsetLeft + size >= rightPanelScrollWidth
          ) {
            return;
          } else {
            taskBar.style.width = size + "px";
          }
        }

        let taskStartDate =
          that.dates[
            Math.round(
              (taskBar.offsetLeft + 1) /
                that.calculateGridWidth(task.start_date, "day")
            )
          ];

        let taskEndDate =
          that.dates[
            Math.round(
              (taskBar.offsetLeft + taskBar.offsetWidth) /
                that.calculateGridWidth(task.start_date, "day")
            ) - 1
          ];

        // emmit the dragTask event
        that.dispatchEvent("onTaskDrag", {
          originalTask,
          task,
          mode: "resize",
        });

        // if taskStartDate is less than the gantt range
        if (!taskStartDate) {
          let dateDiff =
            Math.round(
              taskBar.offsetLeft /
                that.calculateGridWidth(task.start_date, "day")
            ) - that.dates.length;
          taskStartDate = that.add(
            new Date(that.dates[that.dates.length - 1]),
            dateDiff,
            "day"
          );
        }
        // if taskEndDate is greater than the gantt range
        if (!taskEndDate) {
          let dateDiff =
            Math.round(
              (taskBar.offsetLeft + taskBar.offsetWidth) /
                that.calculateGridWidth(task.start_date, "day")
            ) - that.dates.length;
          taskEndDate = that.add(
            new Date(that.dates[that.dates.length - 1]),
            dateDiff,
            "day"
          );
        }

        if (task.type === "milestone") {
          taskEndDate = new Date(taskStartDate).setHours(23, 59, 59);
        }
        that.updateTask(
          task,
          new Date(taskStartDate),
          new Date(taskEndDate),
          taskBar
        );
      }
    },

    updateTask: function (task, start, end, target, eventType = "mousemove") {
      start = new Date(start);
      end = new Date(end);
      // get the current start and end date of the taskbar
      let taskCurrentStart = new Date(
        this.dates[
          Math.floor(target.offsetLeft / this.calculateGridWidth(start, "day"))
        ]
      );
      let taskCurrentEnd = new Date(
        this.dates[
          Math.floor(
            (target.offsetLeft + target.offsetWidth - 1) /
              this.calculateGridWidth(start, "day")
          )
        ]
      );
      let startTimePixel = Math.round(
        target.offsetLeft % this.calculateGridWidth(start, "day")
      );
      let startDateTime = this.getTimeByPx(startTimePixel, start);
      taskCurrentStart = new Date(taskCurrentStart);
      taskCurrentStart.setHours(startDateTime.hours, startDateTime.minutes);

      let endTimePixel = Math.round(
        (target.offsetLeft + target.offsetWidth - 1) %
          this.calculateGridWidth(start, "day")
      );
      let endDateTime = this.getTimeByPx(endTimePixel, end);
      taskCurrentEnd = new Date(taskCurrentEnd);
      taskCurrentEnd.setHours(endDateTime.hours, endDateTime.minutes);
      // update the task content innerHTML
      if (task.type === "milestone") {
        target.querySelector(".zt-gantt-side-content").innerHTML =
          this.templates.taskbar_text(start, end, task);
      } else {
        target.querySelector(".zt-gantt-bar-task-content").innerHTML =
          this.templates.taskbar_text(taskCurrentStart, taskCurrentEnd, task);
      }

      // update the data in originalData
      for (let i = 0; i < this.originalData.length; i++) {
        if (this.originalData[i].id == task.id) {
          this.originalData[i].start_date = start;
          this.originalData[i].end_date = end;
          break;
        }
      }

      if (this.options.zoomLevel === "hour") {
        let taskLeft = Math.floor(
          (target.offsetLeft + 1) /
            this.calculateGridWidth(task.start_date, "day")
        );

        start = this.dates[taskLeft];
        let extraStartPX =
          target.offsetLeft +
          1 -
          taskLeft * this.calculateGridWidth(task.start_date, "day");
        let taskStartTime = this.getTimeByPx(extraStartPX, new Date(start));
        start = new Date(new Date(start).setHours(taskStartTime.hours));

        let taskLeftAndWidth = Math.floor(
          (target.offsetLeft + target.offsetWidth) /
            this.calculateGridWidth(task.end_date, "day")
        );
        end = this.dates[taskLeftAndWidth];
        let extraEndPX =
          target.offsetLeft +
          target.offsetWidth +
          1 -
          taskLeftAndWidth * this.calculateGridWidth(task.end, "day");

        let taskEndTime = this.getTimeByPx(extraEndPX, new Date(end));
        end = new Date(new Date(end).setHours(taskEndTime.hours - 1));
      }

      this.updateTaskDate(task, start, end);
      this.updateTaskDuration();
      let start_date;
      let end_date;
      if (target.classList.contains("zt-gantt-bar-parent-task")) {
        return;
      }
      let that = this;
      let allParents = target.getAttribute("task-parent").split("");
      let taskData = [...this.options.data];

      updateAllParents(taskData, allParents, eventType);

      function updateAllParents(data, allParents, eventType) {
        let currentTask;
        let currentLevel = data;
        let currentParentSelector = allParents[0];
        for (let i = 0; i < allParents.length - 1; i++) {
          if (
            currentLevel[allParents[i]].hasOwnProperty("start_date") &&
            currentLevel[allParents[i]].hasOwnProperty("end_date")
          ) {
            start_date = currentLevel[allParents[i]].start_date;

            end_date =
              currentLevel[allParents[i]].end_date ||
              currentLevel[allParents[i]].start_date;
          }

          currentTask = currentLevel[allParents[i]];
          currentLevel = currentLevel[allParents[i]].children;
          let currentParent = document.querySelector(
            `[task-parent="${currentParentSelector}"]`
          );

          currentParentSelector = `${currentParentSelector}${
            allParents[i + 1]
          }`;

          if (currentLevel) {
            let currentTaskDates = that.getStartAndEndDate(
              currentTask.children
            );

            start_date = start_date
              ? currentTaskDates.startDate.getTime() <
                new Date(start_date).getTime()
                ? currentTaskDates.startDate
                : start_date
              : currentTaskDates.startDate;

            end_date = end_date
              ? currentTaskDates.startDate.getTime() >
                new Date(end_date).getTime()
                ? currentTaskDates.endDate
                : end_date
              : currentTaskDates.endDate;

            let cellStartDate = that.options.startDate;
            let isCellGreater = true;
            let cellBefore = that.getDates(cellStartDate, new Date(start_date));
            let taskDates = that.getDates(start_date, new Date(end_date));

            if (cellBefore.length === 0) {
              cellBefore = that.getDates(start_date, cellStartDate);
              isCellGreater = false;
            }

            if (!that.options.fullWeek) {
              cellBefore = that.filterWeekends(cellBefore);
              taskDates = taskDates.filter((date) => {
                return !that.options.weekends.includes(
                  that.options.dateFormat.day_short[new Date(date).getDay()]
                );
              });
            }

            if (isCellGreater) {
              cellBefore = cellBefore.length - 1;
            } else {
              cellBefore = -(cellBefore.length - 1);
            }

            if (currentParent) {
              // update parent inner html
              if (currentTask.type === "milestone") {
                if (currentParent.offsetLeft < 0) {
                  let beforeDay = Math.floor(
                    currentParent.offsetLeft /
                      that.calculateGridWidth(taskCurrentStart, "day")
                  );
                  start_date = that.add(
                    new Date(that.options.startDate),
                    beforeDay,
                    "day"
                  );
                } else {
                  start_date = new Date(
                    that.dates[
                      Math.floor(
                        currentParent.offsetLeft /
                          that.calculateGridWidth(taskCurrentStart, "day")
                      )
                    ]
                  );
                }

                end_date = new Date(new Date(start_date).setHours(23, 59, 59));
                currentParent.querySelector(
                  ".zt-gantt-side-content"
                ).innerHTML = that.templates.taskbar_text(
                  start_date,
                  end_date,
                  currentTask
                );
              } else {
                // find All childs of current parent
                let allChildsLeft = [];
                let allChildsLeftAndWidth = [];
                that.eachTask((task) => {
                  if (task.parent == currentTask.id) {
                    let childTaskBar = document.querySelector(
                      `[zt-gantt-taskbar-id="${task.id}"]`
                    );
                    if (childTaskBar) {
                      allChildsLeft.push(
                        childTaskBar.offsetLeft -
                          (task.type === "milestone" ? 9 : 0)
                      );
                      allChildsLeftAndWidth.push(
                        childTaskBar.offsetLeft -
                          (task.type === "milestone" ? 9 : 0) +
                          childTaskBar.offsetWidth
                      );
                    }
                  }
                });

                // if parent has startdate and end date
                if (
                  currentTask.hasOwnProperty("start_date") ||
                  currentTask.hasOwnProperty("end_date")
                ) {
                  let cellStartDate = that.options.startDate;
                  let isCellGreater = true;
                  let cellBefore = that.getDates(
                    cellStartDate,
                    new Date(currentTask.start_date)
                  );
                  let taskDates = that.getDates(
                    currentTask.start_date,
                    new Date(currentTask.end_date)
                  );

                  if (cellBefore.length === 0) {
                    cellBefore = that.getDates(
                      currentTask.start_date,
                      cellStartDate
                    );
                    isCellGreater = false;
                  }

                  if (!that.options.fullWeek) {
                    cellBefore = that.filterWeekends(cellBefore);
                    taskDates = that.filterWeekends(taskDates);
                  }

                  if (isCellGreater) {
                    cellBefore = cellBefore.length - 1;
                  } else {
                    cellBefore = -(cellBefore.length - 1);
                  }

                  if (currentTask.start_date) {
                    allChildsLeft.push(
                      cellBefore * that.calculateGridWidth(start_date, "day")
                    );
                  }

                  if (currentTask.end_date) {
                    allChildsLeftAndWidth.push(
                      cellBefore * that.calculateGridWidth(start_date, "day") +
                        taskDates.length *
                          that.calculateGridWidth(start_date, "day")
                    );
                  }
                }

                let parentLeft = Math.min(...allChildsLeft);
                let parentWidth =
                  Math.max(...allChildsLeftAndWidth) -
                  Math.min(...allChildsLeft);

                if (eventType === "mouseup") {
                  const gridWidth = that.calculateGridWidth(
                    task.start_date,
                    that.options.zoomLevel !== "hour" ? "day" : ""
                  );
                  parentLeft = Math.round(parentLeft / gridWidth) * gridWidth;
                  parentWidth = Math.round(parentWidth / gridWidth) * gridWidth;
                }
                if (!isCellGreater) {
                  let beforeDay = Math.floor(
                    parentLeft /
                      that.calculateGridWidth(taskCurrentStart, "day")
                  );
                  start_date = that.add(
                    new Date(that.options.startDate),
                    beforeDay,
                    "day"
                  );
                } else {
                  start_date = new Date(
                    that.dates[
                      Math.floor(
                        parentLeft /
                          that.calculateGridWidth(taskCurrentStart, "day")
                      )
                    ]
                  );
                }

                let afterDay = Math.floor(
                  (parentLeft + parentWidth) /
                    that.calculateGridWidth(taskCurrentEnd, "day")
                );

                if (afterDay > that.dates.length) {
                  end_date = that.add(
                    new Date(that.options.endDate),
                    afterDay - that.dates.length,
                    "day"
                  );
                } else {
                  let dateIndex = Math.floor(
                    (parentLeft + parentWidth) /
                      that.calculateGridWidth(taskCurrentEnd, "day")
                  );

                  end_date = new Date(that.dates[dateIndex - 1]);
                }

                currentParent.querySelector(
                  ".zt-gantt-bar-task-content"
                ).innerHTML = that.templates.taskbar_text(
                  start_date,
                  end_date,
                  currentTask
                );

                if (
                  parentWidth <
                    that.calculateGridWidth(taskCurrentEnd, "day") &&
                  task.type === "milestone"
                ) {
                  parentLeft =
                    that.posFromDate(
                      eventType === "mouseup" ? start : taskCurrentStart
                    ) -
                    (eventType !== "mouseup"
                      ? that.calculateGridWidth(taskCurrentEnd, "day") -
                        target.offsetWidth
                      : 0);
                  parentWidth = that.calculateGridWidth(taskCurrentEnd, "day");
                }

                currentParent.style.left = `${parentLeft}px`;
                currentParent.style.width = `${parentWidth}px`;
              }
            }
          }
        }
      }
    },

    updateTaskDate: function (task, start, end) {
      task.start_date = start;
      task.end_date = end;
      this.originalData.findIndex((item) => {
        if (item.id == task.id) {
          item.start_date = start;
          item.end_date = end;
        }
      });
    },

    initColSizes: function (unit, step, date) {
      let startDate, endDate;
      let startAndEndDate;

      if (unit == "hour") {
        // if unit is day and step is greater than 1
        startAndEndDate = {
          start: new Date(date),
          end: new Date(date),
        };
      } else if (unit == "day") {
        // if unit is day and step is greater than 1
        startAndEndDate = {
          start: new Date(date),
          end: new Date(date),
        };
      } else if (unit == "week") {
        // if unit is week
        startAndEndDate = this.getWeekStartEndDate(date);
      } else if (unit == "month") {
        // if unit is month
        startAndEndDate = this.getMonthStartEndDate(date);
      } else if (unit == "quarter") {
        // if unit is quarter
        startAndEndDate = this.getQuarterStartEndDate(date);
      } else if (unit == "year") {
        // if unit is year
        let dateYear = new Date(date).getFullYear();
        startAndEndDate = {
          start: new Date(dateYear, 0, 1),
          end: new Date(dateYear, 11, 31),
        };
      } else {
        this.toastr("Error", `Invalid scale unit: ${unit}`, "error");
      }

      startDate = startAndEndDate.start;
      endDate = startAndEndDate.end;

      if (step > 1) {
        endDate = this.add(endDate, step - 1, unit);
      }

      const dateCount = this.getDates(startDate, endDate).filter((date) => {
        const rangeStart = new Date(this.options.startDate).setHours(
          0,
          0,
          0,
          0
        );
        const rangeEnd = new Date(this.options.endDate).setHours(0, 0, 0, 0);
        const dateToCheck = new Date(date).setHours(0, 0, 0, 0);
        return dateToCheck >= rangeStart && dateToCheck <= rangeEnd;
      });

      return {
        startDate: startDate,
        endDate: endDate,
        dateCount: dateCount,
      };
    },

    // get month start and end date of a date
    getMonthStartEndDate: function (date) {
      date = new Date(date); // date for which we find month start and month end
      const year = date.getFullYear();
      const month = date.getMonth() + 1; // Add 1 because getMonth() returns 0-indexed months
      const firstDayOfMonth = new Date(year, month - 1, 1);
      const lastDayOfMonth = new Date(year, month, 0);
      return {
        start: firstDayOfMonth,
        end: lastDayOfMonth,
      };
    },

    // get quarter start and end date of a date
    getQuarterStartEndDate: function (dateString) {
      const date = new Date(dateString);
      const year = date.getFullYear();
      const month = date.getMonth();

      const quarterStartMonth = Math.floor(month / 3) * 3;
      const quarterStartDate = new Date(year, quarterStartMonth, 1);
      const quarterEndDate = new Date(year, quarterStartMonth + 3, 0);

      return {
        start: quarterStartDate,
        end: quarterEndDate,
      };
    },

    // calculate scale height
    calculateScaleHeight: function (scales, scaleHeight, type, i) {
      if (type === "header" || type === "scroll") {
        let height;
        if (Array.isArray(scaleHeight)) {
          height = scaleHeight.reduce((total, height) => total + height);
          if (scales.length !== scaleHeight.length) {
            height += (scales.length - scaleHeight.length) * 30;
          }
        } else {
          height = scales.length * scaleHeight;
        }
        return type === "scroll" ? height : `${height}px`;
      } else {
        if (Array.isArray(scaleHeight)) {
          return `${i > 0 ? scaleHeight[i] || 30 : scaleHeight[i] - 1 || 29}px`;
        } else {
          return `${i > 0 ? scaleHeight : scaleHeight - 1}px`;
        }
      }
    },

    calculateGridWidth: function (
      date = new Date(0),
      levelType = this.options.zoomLevel
    ) {
      let sidebar = document.getElementById("zt-gantt-grid-left-data");
      const totalWidth = this.options.columns.reduce(
        (totalWidth, col) => totalWidth + col.width,
        0
      );

      let sidebarWidth = 0;
      if (sidebar) {
        let headCell = document.querySelectorAll(".head-cell");
        if (headCell.length !== this.options.columns.length) {
          sidebarWidth = totalWidth;
        } else {
          sidebarWidth = sidebar.offsetWidth;
        }
      } else {
        sidebarWidth = totalWidth;
      }

      let elementWidth = this.element.scrollWidth - sidebarWidth;

      if (this.options.rightGrid) {
        const totalWidth = this.options.rightGrid.reduce(
          (totalWidth, col) => totalWidth + col.width,
          0
        );
        elementWidth -= totalWidth;
      }

      if (
        sidebar?.offsetHeight < sidebar?.scrollHeight ||
        this.options.ganttHeight > this.element.offsetHeight
      ) {
        elementWidth -= 22;
      } else {
        elementWidth -= sidebar?.offsetHeight ? 2 : 0;
      }

      let minWidth = this.options.minColWidth;
      const colCount = this.dates.length;
      let level = date !== new Date(0) ? this.options.zoomLevel : "day";
      date = new Date(date);
      switch (level) {
        case "hour":
          minWidth = levelType === "day" ? minWidth : minWidth / 24;
          break;
        case "week":
          minWidth = minWidth / 7;
          break;
        case "month":
          minWidth = minWidth / this.getDaysInMonth(date);
          break;
        case "quarter":
          minWidth = minWidth / this.getDaysInQuarter(date);
          break;
        case "year":
          minWidth = minWidth / 365;
          break;
        default:
          minWidth = minWidth;
          break;
      }
      const gridWidth = Math.max(
        elementWidth /
          (level === "hour" && levelType !== "day" ? colCount * 24 : colCount),
        minWidth
      );
      return gridWidth;
    },

    calculateTimeLineWidth: function (
      type,
      levelType = this.options.zoomLevel
    ) {
      let totalWidth = 0;
      if (type == "updated") {
        if (this.options.zoomLevel !== "day" && levelType !== "day") {
          let colDates;
          let endDate = new Date(0);
          for (let i = 0; i < this.dates.length; i++) {
            colDates = this.initColSizes(
              this.options.zoomLevel,
              1,
              this.dates[i]
            );
            let cellWidth = this.calculateGridWidth(this.dates[i]);
            if (endDate.getTime() < this.dates[i]) {
              totalWidth += cellWidth * colDates.dateCount.length;
              endDate = colDates.endDate;
            }
          }
        } else {
          totalWidth =
            this.calculateGridWidth(new Date(0), levelType) * this.dates.length;
        }
      } else {
        let timeLineRow = document.querySelector(".zt-gantt-task-row");
        let timeLineCell = timeLineRow.querySelectorAll(".zt-gantt-task-cell");
        totalWidth = Array.from(timeLineCell).reduce(
          (totalWidth, cell) => totalWidth + cell.offsetWidth,
          0
        );
      }
      return totalWidth;
    },

    // create lightbox
    createLightbox: function () {
      if (this.lightbox) return;

      const lightbox = document.createElement("div");
      const lightboxBackdrop = document.createElement("div");

      this.lightbox = {
        lightbox,
        lightboxBackdrop,
      };

      lightbox.style.display = "none";
      lightboxBackdrop.style.display = "none";

      lightbox.classList.add("zt-gantt-lightbox");
      lightbox.id = "zt-gantt-lightbox";
      lightboxBackdrop.classList.add("zt-gantt-lightbox-backdrop");
      lightboxBackdrop.id = "zt-gantt-lightbox-backdrop";
      lightbox.setAttribute("role", "dialog");

      document.body.append(lightboxBackdrop);
      document.body.append(lightbox);
    },

    // show lightbox
    showLightBox: function (task) {
      if (!this.lightbox) return;

      const { lightbox, lightboxBackdrop } = this.lightbox;

      lightbox.innerHTML =
        this.templates.showLightBox?.(task) ||
        `<div class="zt-gantt-task-title">
    <span>${task.text}</span>
  </div>
  <div><p>${this.options.currentLanguage.label.description}</p></div>
  <div>
  <textarea rows="4" id="lightbox-text-area" placeholder="Description">${task.text}</textarea>
  </div>
  <div class='lightbox-footer'>
  <button role="save">${this.options.currentLanguage.buttons.save}</button>
  <button role="cancel">${this.options.currentLanguage.buttons.cancel}</button>
  <button role="delete">${this.options.currentLanguage.buttons.delete}</button>
  </div>   
  `;

      lightbox.style.display = "block";
      lightboxBackdrop.style.display = "block";

      if (
        !this.templates?.showLightBox &&
        !this.isFunction(this.templates?.showLightBox)
      ) {
        const that = this;

        // hide lightbox
        const cancelbtn = document.querySelector("[role=cancel]");

        cancelbtn.addEventListener("click", handleCancelClick);
        function handleCancelClick() {
          that.hideLightbox();
        }

        // delete task
        const deletebtn = document.querySelector("[role=delete]");

        deletebtn.addEventListener("click", handleDeleteClick);
        function handleDeleteClick() {
          that.deleteTask(task.id);
        }

        // update task
        const savebtn = document.querySelector("[role=save]");
        const textarea = document.querySelector("#lightbox-text-area");

        savebtn.addEventListener("click", handleSaveClick);
        function handleSaveClick() {
          task.text = textarea.value;
          that.updateTaskData(task);
        }
      }
    },

    // hide lightbox
    hideLightbox: function () {
      if (!this.lightbox) return;
      const { lightbox, lightboxBackdrop } = this.lightbox;
      const backdrop = lightboxBackdrop;
      lightbox.style.display = "none";
      backdrop.style.display = "none";
    },

    // add Task
    addTask: function (task) {
      if (task.id == task.parent) {
        this.toastr(
          "Error",
          "task id and task parent can not be same",
          "error"
        );
      }

      this.originalData.unshift(task);
      this.eachTask((item) => {
        if (item.id == task.parent) {
          if (!item.children) {
            item.children = [];
          }

          item.children.unshift(task);
        }
      });

      // this.render();
      if (!this.options.openedTasks.includes(+task.parent)) {
        this.options.openedTasks.push(+task.parent);
      }

      this.options.openedTasks.push(task.id);
      this.hideLightbox();
    },

    // delete task
    deleteTask: function (id) {
      const task = this.getTask(id);
      for (let i = 0; i < this.originalData.length; i++) {
        if (this.originalData[i].id == id) {
          this.originalData.splice(i, 1);
          this.render();
          this.hideLightbox();
          this.dispatchEvent("onTaskDelete", { task });
          break;
        }
      }
    },

    // update task data
    updateTaskData: function (task) {
      const updatedTaskIndex = this.originalData.findIndex(
        (item) => item.id === task.id
      );

      if (updatedTaskIndex !== -1) {
        this.originalData[updatedTaskIndex] = {
          ...this.originalData[updatedTaskIndex],
          ...task,
        };

        this.eachTask((item, parentTask, index) => {
          if (item.id === task.id) {
            parentTask[index] = this.originalData[updatedTaskIndex];
          }
        });

        this.updateTaskDuration();
        this.hideLightbox();
        this.dispatchEvent("onAfterTaskUpdate", { task });
      }
    },

    // export Gantt as PNG
    exportToPNG: async function (name = "ztGantt", styleSheet) {
      await this.getFile(name, "png", styleSheet);
    },

    // export Gantt as PDF
    exportToPDF: async function (name = "ztGantt", styleSheet) {
      await this.getFile(name, "pdf", styleSheet);
    },

    //export Gantt as Excel
    exportToExcel: function (name = "ztGantt") {
      let csv = "";
      const regexIgnorePattern =
        /<[^>]+?\szt-gantt-ignore=(["'])(true)\1[^>]*>.*?<\/[^>]+?>/g;

      // Function to escape quotes and commas in the CSV content
      function escapeCSV(value) {
        if (typeof value === "string") {
          value = value.replace(regexIgnorePattern, "").replace(/<[^>]*>/g, "");
          if (
            value.includes(",") ||
            value.includes('"') ||
            value.includes("\n")
          ) {
            value = `"${value.replace(/"/g, '""')}"`;
          }
        }
        return value;
      }

      // Create the header row
      let headerRow = this.options.columns
        .map((col) => escapeCSV(col.label))
        .join(",");

      let right = this.options.rightGrid;
      if (right) {
        headerRow += "," + right.map((col) => escapeCSV(col.label)).join(",");
      }

      csv += headerRow + "\n";

      // Call the recursive function to convert data to CSV
      csv += convertToCSV(this.options.data, this.options.columns, right);

      // Recursive function to convert data to CSV
      function convertToCSV(array, columns, right) {
        let csvData = "";

        array.forEach((obj) => {
          let rowData = columns.map((col) => escapeCSV(col.template(obj)));
          if (right) {
            rowData.push(...right.map((col) => escapeCSV(col.template(obj))));
          }
          csvData += rowData.join(",") + "\n";

          if (obj.children && obj.children.length > 0) {
            csvData += convertToCSV(obj.children, columns, right);
          }
        });

        return csvData;
      }

      // Create a download link
      let link = document.createElement("a");
      link.setAttribute(
        "href",
        "data:text/csv;charset=utf-8," + encodeURIComponent(csv)
      );
      link.setAttribute("download", `${name}.csv`);
      // Programmatically trigger the download
      link.click();
      link.remove();
    },

    // function for calling api
    getFile: async function (filename = "ztGantt", type, styleSheet) {
      const apiUrl = this.options.exportApi;

      if (!this.options.exportApi) {
        this.toastr("Add export url", "Please add an export url!!", "error");
        return;
      }

      const postData = {
        styles: styleSheet,
        content: this.element.outerHTML,
        fileType: type,
        zoom: this.options.zoomLevel,
      };

      const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(postData),
      };
      this.showLoader();
      await fetch(apiUrl, requestOptions)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((data) => {
          const blob = new Blob([new Uint8Array(data.data.data)], {
            type: "application/pdf",
          });
          this.saveAs(filename, blob, type);
          this.hideLoader();
        })
        .catch((error) => {
          console.error("Fetch error:", error);
          this.toastr("Export Error", error, "error");
          this.hideLoader();
        });
    },

    // function for saving file
    saveAs: function (fileName, blob, type) {
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = fileName + "." + type;
      link.click();
      URL.revokeObjectURL(url);
    },

    createChildTask: function (
      taskData,
      options,
      leftDataContainer,
      nestedLevel,
      parentIdString,
      isRight,
      isOpened
    ) {
      // if children exist
      if (taskData && taskData?.length > 0) {
        // loop through all the children
        for (let l = 0; l < taskData.length; l++) {
          if (this.searchedData) {
            this.options.openedTasks.push(taskData[l].id);
          }
          let taskParents = `${parentIdString}${l}`;
          let dataItem = document.createElement("div");
          dataItem.classList.add(
            "zt-gantt-row-item",
            "zt-gantt-child-row",
            `zt-gantt-child-${taskData[l].parent}`,
            !isOpened ? "zt-gantt-d-none" : "zt-gantt-d-flex",
            this.options.selectedRow === `${taskData[l].id}`
              ? "zt-gantt-selected"
              : "zt-gantt-row-item"
          );

          //add custom classes from user
          const { start_date, end_date } = this.getLargeAndSmallDate(
            taskData[l]
          );
          this.addClassesFromFunction(
            this.templates.grid_row_class,
            dataItem,
            start_date,
            end_date,
            taskData[l]
          );

          dataItem.setAttribute("zt-gantt-data-task-id", `${taskParents}`);
          dataItem.setAttribute("zt-gantt-task-id", taskData[l].id);
          dataItem.style.height = options.row_height + "px";
          dataItem.style.lineHeight = options.row_height + "px";
          let that = this;

          // handle double click event
          dataItem.addEventListener("dblclick", handleDblClick);

          function handleDblClick(e) {
            if (e.target.classList.contains("zt-gantt-tree-icon")) return;

            // custom event handler
            that.dispatchEvent("onBeforeTaskDblClick", { task: taskData[l] });

            // if onBeforeTaskDblClick return false then do not drag the task
            if (that.eventValue === false) {
              that.eventValue = true;
              return;
            }

            that.dispatchEvent("onTaskDblClick", { task: taskData[l] });

            that.showLightBox(taskData[l]);
          }

          // Handle mouseover event
          dataItem.addEventListener("mouseover", () =>
            this.updateTooltipBody(taskData[l])
          );

          // Handle mouseleave event
          dataItem.addEventListener("mouseleave", this.hideTooltip.bind(this));

          this.addClickListener(dataItem, (e) => {
            if (e.target.classList.contains("zt-gantt-tree-icon")) {
              return;
            }

            let selectedRows = document.querySelectorAll(".zt-gantt-selected");
            let selectedTaskBars = document.querySelectorAll(
              ".zt-gantt-selected-task-bar"
            );

            // scroll horizontall scroll
            let horizontalScroll = document.querySelector(
              ".zt-gantt-hor-scroll"
            );

            cellBefore =
              document.querySelector(
                `[zt-gantt-taskbar-id="${taskData[l].id}"]`
              ).offsetLeft - 80;

            if (horizontalScroll) {
              horizontalScroll.scrollLeft = cellBefore < 0 ? 0 : cellBefore;
            }

            for (let item of selectedRows) {
              item.classList.remove("zt-gantt-selected");
            }

            for (let item of selectedTaskBars) {
              item.classList.remove("zt-gantt-selected-task-bar");
            }

            // select the selected task taskBar
            let currentTaskBar = document.querySelector(
              `[zt-gantt-taskbar-id="${taskData[l].id}"]`
            );
            currentTaskBar.classList.add("zt-gantt-selected-task-bar");

            let taskRow = document.querySelectorAll(
              `[zt-gantt-data-task-id="${taskParents}"]`
            );
            for (let item of taskRow) {
              item.classList.add("zt-gantt-selected");
            }
            that.options.selectedRow = `${taskData[l].id}`;
            that.options.selectedTask = `${taskData[l].id}`;
          });

          // loop through all the columns
          for (let k = 0; k < options.columns.length; k++) {
            let cell = document.createElement("div");
            cell.classList.add("zt-gantt-cell");

            //add custom class from user
            this.addClassesFromFunction(
              this.templates.grid_cell_class,
              cell,
              this.options.columns[k],
              taskData[l]
            );

            cell.style.width = (options.columns[k].width || 80) + "px";
            options.columns[k].align
              ? (cell.style.textAlign = options.columns[k].align)
              : "";
            options.columns[k].align
              ? (cell.style.justifyContent = options.columns[k].align)
              : "";

            let ztGanttBlank = document.createElement("div");
            ztGanttBlank.classList.add("zt-gantt-blank");

            ztGanttBlank.innerHTML = this.templates.grid_blank(taskData[l]);

            // content
            let content = document.createElement("div");
            content.classList.add(
              "zt-gantt-cell-data",
              "zt-gantt-child-cell",
              `${k == 0 ? "zt-gantt-d-block" : "zt-gantt-child-data"}`
            );
            if (isRight) {
              cell.setAttribute("data-column-index", "r-" + k);
            } else {
              cell.setAttribute("data-column-index", k);
            }
            content.innerHTML =
              options.columns[k].template(taskData[l]) ||
              taskData[l][options.columns[k].name] ||
              " ";

            // update content innerHTML on after task update
            this.attachEvent("onAfterTaskUpdate", (e) => {
              content.innerHTML =
                options.columns[k].template(taskData[l]) ||
                taskData[l][options.columns[k].name] ||
                " ";
            });

            // update content innerHTML on after progress drag
            this.attachEvent("onAfterProgressDrag", (e) => {
              content.innerHTML =
                options.columns[k].template(taskData[l]) ||
                taskData[l][options.columns[k].name] ||
                " ";
            });

            // update content innerHTML on task drag
            this.attachEvent("onTaskDrag", (e) => {
              content.innerHTML =
                options.columns[k].template(taskData[l]) ||
                taskData[l][options.columns[k].name] ||
                " ";
            });

            // update content innerHTML on after task drag
            this.attachEvent("onAfterTaskDrag", (e) => {
              content.innerHTML =
                options.columns[k].template(taskData[l]) ||
                taskData[l][options.columns[k].name] ||
                " ";
            });

            if (options.columns[k].tree) {
              // file icon
              let file = document.createElement("div");
              file.classList.add("zt-gantt-file-icon");
              file.innerHTML = this.templates.grid_file(taskData[l]);

              //add child indentation
              for (let n = 0; n < nestedLevel; n++) {
                let indent = document.createElement("div");
                indent.classList.add("zt-gantt-indent");
                cell.append(indent);
              }
              cell.classList.add("zt-gantt-d-flex");

              if (taskData[l].children && taskData[l].children.length > 0) {
                // tree icon
                let treeIcon = document.createElement("div");
                treeIcon.classList.add(
                  "zt-gantt-tree-icon",
                  !this.options.openedTasks.includes(taskData[l].id)
                    ? "zt-gantt-tree-close"
                    : "zt-gantt-tree-open"
                );
                cell.append(treeIcon);

                let that = this;
                setTimeout(() => {
                  let toggleTreeIcon = treeIcon;
                  this.addClickListener(toggleTreeIcon, (event) => {
                    let children = document.getElementsByClassName(
                      `zt-gantt-child-${taskData[l].id}`
                    );

                    const isTaskOpened = toggleTreeIcon.classList.contains(
                      "zt-gantt-tree-close"
                    );
                    if (
                      toggleTreeIcon.classList.contains("zt-gantt-tree-close")
                    ) {
                      that.options.openedTasks.push(taskData[l].id);

                      let t = 0;
                      for (const child of taskData[l].children) {
                        if (child.children) {
                          that.setCollapseAll(child.children, child.id, "open");
                        }
                        t += 1;
                      }
                    } else {
                      const openedTask = that.options.openedTasks.indexOf(
                        taskData[l].id
                      );
                      if (openedTask > -1) {
                        that.options.openedTasks.splice(openedTask, 1);
                      }
                      let t = 0;
                      for (const child of taskData[l].children) {
                        if (child.children) {
                          that.setCollapseAll(
                            child.children,
                            child.id,
                            "collapse"
                          );
                        }
                        t += 1;
                      }
                    }
                    that.createTaskBars();
                    toggleTreeIcon.classList.toggle("zt-gantt-tree-close");
                    toggleTreeIcon.classList.toggle("zt-gantt-tree-open");
                    for (let i = 0; i < children.length; i++) {
                      children[i].classList.toggle("zt-gantt-d-none");
                      children[i].classList.toggle("zt-gantt-d-flex");
                    }
                    let mainContainer =
                      document.querySelector("#zt-gantt-layout");
                    that.createScrollbar(mainContainer, options);

                    // custom event of toggle tree
                    that.dispatchEvent("onTaskToggle", {
                      task: taskData[l],
                      isTaskOpened,
                    });
                  });
                }, 0);
              } else {
                cell.append(ztGanttBlank);
              }
              cell.append(file);
            }
            cell.append(content);
            dataItem.append(cell);
            if (this.options.columns[k]?.editor) {
              cell.addEventListener("click", (e) => {
                if (e.target.classList.contains("zt-gantt-tree-icon")) return;
                this.addInlineEditor(
                  taskData[l],
                  this.options.columns[k].editor,
                  cell,
                  leftDataContainer
                );
              });
            }
          }

          let isTaskExist = this.getTask(taskData[l].id, this.searchedData);
          if (!this.searchedData || isTaskExist) {
            leftDataContainer.append(dataItem);
          }

          this.createChildTask(
            taskData[l].children,
            options,
            leftDataContainer,
            nestedLevel + 1,
            taskParents,
            isRight,
            isOpened
              ? this.options.openedTasks.includes(taskData[l].id)
              : isOpened
          );
        }
      }
    },

    createBodyChildTask: function (
      taskData,
      options,
      j,
      dates,
      weekday,
      ztGanttTaskData,
      parentIdString,
      isOpened
    ) {
      const timelineRowTemplate = this.createRowTemplate();
      // loop through all the children
      for (let l = 0; l < taskData.length; l++) {
        const isTaskExist = this.getTask(taskData[l].id, this.searchedData);
        if (this.searchedData && !isTaskExist) continue;

        const taskParents = `${parentIdString}${l}`;
        const timelineRow = timelineRowTemplate.cloneNode(true);
        const isRowSelected = options.selectedRow === `${taskData[l].id}`;
        const isCollapsed = !options.openedTasks.includes(taskData[l].parent);

        // Array to hold the classes
        const classes = [
          "zt-gantt-child-row",
          `zt-gantt-child-${taskData[l].parent}`,
        ];

        // Conditionally add classes based on `isCollapsed` and `isOpened`
        if (isCollapsed || !isOpened) {
          classes.push("zt-gantt-d-none");
        }

        // Conditionally add the selected class
        if (isRowSelected) {
          classes.push("zt-gantt-selected");
        }

        timelineRow.classList.add(...classes);

        //add custom classes from user
        const { start_date, end_date } = this.getLargeAndSmallDate(taskData[l]);
        this.addClassesFromFunction(
          this.templates.task_row_class,
          timelineRow,
          start_date,
          end_date,
          taskData[l]
        );

        timelineRow.setAttribute("zt-gantt-data-task-id", taskParents);
        timelineRow.setAttribute("zt-gantt-task-id", taskData[l].id);

        // handle cell click event
        this.addClickListener(timelineRow, (e) => {
          if (e.target.closest(".zt-gantt-task-cell")) {
            this.dispatchEvent("onCellClick", {
              task: taskData[l],
              cellDate: e.target.getAttribute("zt-gantt-cell-date"),
            });
          }
        });

        ztGanttTaskData.append(timelineRow);

        // if children exist
        if (taskData[l]?.children?.length) {
          this.createBodyChildTask(
            taskData[l].children,
            options,
            j,
            dates,
            weekday,
            ztGanttTaskData,
            taskParents,
            isOpened
              ? this.options.openedTasks.includes(taskData[l].id)
              : isOpened
          );
        }
      }
    },

    createChildTaskBars: function (
      taskData,
      rowCount,
      cellStartDate,
      ztGanttBarsArea,
      j
    ) {
      // loop through all children
      for (let k = 0; k < taskData.length; k++) {
        let taskParents = `${j}${k}`;
        let isTaskExist = this.getTask(taskData[k].id, this.searchedData);

        let start_date = taskData[k].start_date;
        let end_date = taskData[k].end_date || taskData[k].start_date;

        if (taskData[k]?.children?.length) {
          ({ start_date, end_date } = this.getLargeAndSmallDate(taskData[k]));
        }

        let isCellGreater = true;
        let cellBefore = this.getDates(
          cellStartDate,
          taskData[k].type === "milestone" ? taskData[k].start_date : start_date
        );

        if (cellBefore.length === 0) {
          cellBefore = this.getDates(start_date, cellStartDate);
          isCellGreater = false;
        }

        if (!this.options.fullWeek) {
          cellBefore = this.filterWeekends(cellBefore);
        }

        if (isCellGreater) {
          cellBefore = cellBefore.length - 1;
        } else {
          cellBefore = -(cellBefore.length - 1);
        }

        let ztGanttBarTask = document.createElement("div");
        if (taskData[k].type === "milestone") {
          ztGanttBarTask.classList.add(
            "zt-gantt-bar-task",
            "zt-gantt-bar-milestone",
            this.options.selectedTask === `${taskData[k].id}`
              ? "zt-gantt-selected-task-bar"
              : "zt-gantt-bar-milestone"
          );
        } else {
          ztGanttBarTask.classList.add(
            "zt-gantt-bar-task",
            this.options.selectedTask === `${taskData[k].id}`
              ? "zt-gantt-selected-task-bar"
              : "zt-gantt-bar-task"
          );
        }

        if (taskData[k].taskColor && taskData[k].type !== "milestone") {
          ztGanttBarTask.style.setProperty(
            "background-color",
            this.changeOpacity(taskData[k].taskColor, this.options.taskOpacity),
            "important"
          );
          ztGanttBarTask.style.setProperty(
            "border-color",
            taskData[k].taskColor,
            "important"
          );
        }

        //add custom class from user
        this.addClassesFromFunction(
          this.templates.task_class,
          ztGanttBarTask,
          start_date,
          end_date,
          taskData[k]
        );

        ztGanttBarTask.setAttribute("task-parent", taskParents);
        ztGanttBarTask.setAttribute("data-task-pos", k);
        ztGanttBarTask.setAttribute("zt-gantt-taskbar-id", taskData[k].id);

        let taskLeft = cellBefore * this.calculateGridWidth(start_date, "day");

        let hourLeft = this.getPxByTime(start_date, "left");
        taskLeft += hourLeft;

        ztGanttBarTask.style.left = taskLeft + "px";

        ztGanttBarTask.style.top =
          rowCount * this.options.row_height +
          Math.floor((this.options.row_height * 10) / 100) +
          "px";
        let barTaskHeight = Math.floor((this.options.row_height * 80) / 100);
        ztGanttBarTask.style.height = `${barTaskHeight}px`;
        ztGanttBarTask.style.lineHeight = `${barTaskHeight}px`;
        if (taskData[k].type === "milestone") {
          ztGanttBarTask.style.width = `${barTaskHeight}px`;
          ztGanttBarTask.style.left =
            (cellBefore + 1) * this.calculateGridWidth(start_date, "day") +
            "px";
        }

        let ztGanttBarTaskContent = document.createElement("div");
        ztGanttBarTaskContent.classList.add(
          "zt-gantt-bar-task-content",
          "child-task-bar-content"
        );

        if (taskData[k].type === "milestone" && taskData[k].taskColor) {
          ztGanttBarTaskContent.style.setProperty(
            "background-color",
            taskData[k].taskColor,
            "important"
          );

          ztGanttBarTaskContent.style.setProperty(
            "border-color",
            taskData[k].taskColor,
            "important"
          );
        }

        let that = this;

        // handle double click event
        ztGanttBarTask.addEventListener("dblclick", handleDblClick);

        function handleDblClick(e) {
          // custom event handler
          that.dispatchEvent("onBeforeTaskDblClick", { task: taskData[k] });

          // if onBeforeTaskDblClick return false then end here
          if (that.eventValue === false) {
            that.eventValue = true;
            return;
          }

          that.dispatchEvent("onTaskDblClick", { task: taskData[k] });

          that.showLightBox(taskData[k]);
        }

        const userAgent = navigator.userAgent;

        // Handle mouseover event
        ztGanttBarTask.addEventListener("mouseover", handleMouseOver);

        function handleMouseOver() {
          if (/^((?!chrome|android).)*safari/i.test(userAgent)) {
            ztGanttBarTask.classList.add("hovered");
          }

          that.updateTooltipBody(taskData[k]);
        }

        // Handle mouseleave event
        ztGanttBarTask.addEventListener("mouseleave", handleMouseLeave);

        function handleMouseLeave() {
          if (/^((?!chrome|android).)*safari/i.test(userAgent)) {
            ztGanttBarTask.classList.remove("hovered");
          }

          that.hideTooltip();
        }

        if (
          this.templates.task_drag("resize", taskData[k]) &&
          taskData[k].type !== "milestone"
        ) {
          let ztGanttTaskDragLeft = document.createElement("div");
          ztGanttTaskDragLeft.classList.add("zt-gantt-task-drag-left");
          let ztGanttTaskDragRight = document.createElement("div");
          ztGanttTaskDragRight.classList.add("zt-gantt-task-drag-right");

          ztGanttBarTask.append(ztGanttTaskDragLeft, ztGanttTaskDragRight);
          this.resizeTaskBars(
            ztGanttTaskDragLeft,
            ztGanttBarTask,
            "left",
            taskData[k]
          );
          this.resizeTaskBars(
            ztGanttTaskDragRight,
            ztGanttBarTask,
            "right",
            taskData[k]
          );
        }

        if (this.templates.task_drag("move", taskData[k])) {
          this.resizeTaskBars(
            ztGanttBarTaskContent,
            ztGanttBarTask,
            "move",
            taskData[k]
          );
        }

        // link control pointers
        let isAddLinks = this.isFunction(this.options.addLinks)
          ? this.options.addLinks(taskData[k])
          : this.options.addLinks;

        if (isAddLinks === true) {
          // left point
          let leftLinkPoint = document.createElement("div");
          leftLinkPoint.classList.add(
            "zt-gantt-link-control",
            "zt-gantt-left-point"
          );
          let leftPoint = document.createElement("div");
          leftPoint.classList.add("zt-gantt-link-point");

          // right point
          let rightLinkPoint = document.createElement("div");
          rightLinkPoint.classList.add(
            "zt-gantt-link-control",
            "zt-gantt-right-point"
          );
          let rightPoint = document.createElement("div");
          rightPoint.classList.add("zt-gantt-link-point");

          leftLinkPoint.append(leftPoint);
          rightLinkPoint.append(rightPoint);
          ztGanttBarTask.append(leftLinkPoint, rightLinkPoint);
          this.createNewLink(
            rightPoint,
            ztGanttBarTask,
            taskData[k].id,
            "right"
          );
          this.createNewLink(leftPoint, ztGanttBarTask, taskData[k].id, "left");
        }

        let taskProgress;
        if (
          this.options.taskProgress === true &&
          taskData[k].type !== "milestone"
        ) {
          let progressPer = taskData[k].progress || 0;
          let taskProgressContainer = document.createElement("div");
          taskProgressContainer.classList.add("zt-gantt-task-progress-wrapper");
          taskProgress = document.createElement("div");
          taskProgress.classList.add("zt-gantt-task-progress");
          taskProgress.style.width = `${
            progressPer > 100 ? 100 : progressPer
          }%`;

          if (taskData[k].taskColor) {
            taskProgress.style.setProperty(
              "background-color",
              taskData[k].taskColor,
              "important"
            );
          }

          taskProgressContainer.append(taskProgress);

          let taskProgressDrag = document.createElement("div");
          taskProgressDrag.classList.add("zt-gantt-task-progress-drag");
          taskProgressDrag.style.left = `${
            progressPer > 100 ? 100 : progressPer
          }%`;

          // update the task progress onAfterTaskUpdate
          this.attachEvent("onAfterTaskUpdate", () => {
            let progress = progressPer > 100 ? 100 : taskData[k].progress || 0;
            taskProgress.style.width = `${progress}%`;

            taskProgressDrag.style.left = `${progress}%`;
          });

          ztGanttBarTask.append(taskProgressContainer, taskProgressDrag);
          this.dragTaskProgress(
            taskProgressDrag,
            taskProgress,
            ztGanttBarTask,
            taskData[k]
          );
        }

        //add custom task color picker
        let isCustomColor = this.isFunction(this.options.taskColor)
          ? this.options.taskColor(taskData[k])
          : this.options.taskColor;

        if (isCustomColor) {
          let colorPicker = document.createElement("div");
          colorPicker.classList.add("zt-gantt-task-color-picker");
          let colorInput = document.createElement("input");
          colorInput.type = "color";

          setTimeout(() => {
            // Get the computed style of the element
            const backgroundElement =
              taskData[k].type === "milestone"
                ? ztGanttBarTaskContent
                : ztGanttBarTask;
            const ztGanttBarTaskStyle =
              window.getComputedStyle(backgroundElement);
            // Get the background-color property value
            const backgroundColor =
              ztGanttBarTaskStyle.getPropertyValue("background-color");
            colorInput.value =
              taskData[k].taskColor || this.rgbaToHex(backgroundColor);
          }, 0);

          colorPicker.append(colorInput);
          ztGanttBarTask.append(colorPicker);

          this.changeTaskbarColor(
            ztGanttBarTask,
            colorInput,
            taskProgress,
            ztGanttBarTaskContent,
            taskData[k]
          );
        }

        let taskDates = this.getDates(start_date, end_date);

        if (!this.options.fullWeek) {
          taskDates = this.filterWeekends(taskDates);
        }

        if (taskData[k].type !== "milestone") {
          let taskWidth =
            taskDates.length * this.calculateGridWidth(end_date, "day");

          if (taskWidth === 0 || !taskWidth) {
            ztGanttBarTask.classList.add("zt-gantt-d-none");
          }

          let hourWidth = this.getPxByTime(end_date, "width");
          let hourLeft = this.getPxByTime(start_date, "left");
          hourWidth += hourLeft;
          taskWidth -= hourWidth;

          ztGanttBarTask.style.width = taskWidth + "px";
        }
        start_date = new Date(start_date).setHours(0, 0, 0);
        end_date = new Date(end_date).setHours(0, 0, 0);
        let sideContent;
        if (taskData[k].type === "milestone") {
          sideContent = document.createElement("div");
          sideContent.classList.add("zt-gantt-side-content");
          sideContent.innerHTML = this.templates.taskbar_text(
            new Date(start_date),
            new Date(end_date),
            taskData[k]
          );
          ztGanttBarTask.append(sideContent);
        } else {
          ztGanttBarTaskContent.innerHTML = this.templates.taskbar_text(
            new Date(start_date),
            new Date(end_date),
            taskData[k]
          );
        }

        this.attachEvent("onAfterTaskUpdate", (event) => {
          if (taskData[k].type === "milestone") {
            sideContent.innerHTML = this.templates.taskbar_text(
              new Date(start_date),
              new Date(end_date),
              taskData[k]
            );
          } else {
            ztGanttBarTaskContent.innerHTML = this.templates.taskbar_text(
              new Date(start_date),
              new Date(end_date),
              taskData[k]
            );
          }
        });

        ztGanttBarTask.append(ztGanttBarTaskContent);

        if (!this.searchedData || isTaskExist) {
          ztGanttBarsArea.append(ztGanttBarTask);
        }

        if (!this.searchedData || isTaskExist) {
          rowCount += 1;
        }

        if (
          taskData[k].children &&
          this.options.openedTasks.includes(taskData[k].id)
        ) {
          rowCount = this.createChildTaskBars(
            taskData[k].children,
            rowCount,
            cellStartDate,
            ztGanttBarsArea,
            taskParents
          );
        }
      }
      return rowCount;
    },

    setAllExpand: function (data, openedTasks) {
      function expandTasksRecursive(tasks) {
        for (const item of tasks) {
          openedTasks.push(item.id);
          if (item.children && item.children.length > 0) {
            expandTasksRecursive(item.children);
          }
        }
      }
      expandTasksRecursive(data);
      return openedTasks;
    },

    setCollapseAll: function (data, parentId, type) {
      const children = document.getElementsByClassName(
        `zt-gantt-child-${parentId}`
      );

      data.forEach((child) => {
        if (child.children && child.children.length > 0) {
          this.setCollapseAll(child.children, child.id, type);
        }
      });

      Array.from(children).forEach((child) => {
        if (type === "collapse") {
          child.classList.add("zt-gantt-d-none");
        } else {
          if (this.options.openedTasks.includes(parentId)) {
            child.classList.remove("zt-gantt-d-none");
          }
        }
      });
    },

    // create right sidebar
    createRightSidebar: function (options, mainContainer) {
      // sidebar head cells
      let sidebar = document.createElement("div");
      sidebar.classList.add("zt-gantt-right-sidebar-cell");
      sidebar.id = "zt-gantt-grid-right-data";
      let headCellContainer = document.createElement("div");
      headCellContainer.classList.add("right-sidebar-head-cell-container");
      let containerHeight = this.calculateScaleHeight(
        options.scales,
        options.scale_height,
        "header",
        0
      );

      const totalWidth = options.columns.reduce(
        (totalWidth, col) => totalWidth + col.width,
        0
      );

      sidebar.style.width = (this.options.rightGridWidth || totalWidth) + "px";
      sidebar.style.minWidth =
        (this.options.rightGridWidth || totalWidth) + "px";

      headCellContainer.style.height = containerHeight;
      headCellContainer.style.lineHeight = containerHeight;

      setTimeout(() => {
        headCellContainer.style.width = sidebar.offsetWidth + "px";
      }, 0);
      sidebar.append(headCellContainer);
      let resizerLeft = 0;
      // head loop of left side
      for (let i = 0; i < options.columns.length; i++) {
        let headCell = document.createElement("div");
        headCell.classList.add("right-head-cell");

        //add custom class from user
        this.addClassesFromFunction(
          this.templates.grid_header_class,
          headCell,
          this.options.columns[i],
          i
        );

        headCell.setAttribute("data-column-index", `r-${i}`);
        headCell.style.width = (options.columns[i].width || 80) + "px";
        headCell.innerHTML = options.columns[i].label;
        headCellContainer.append(headCell);
        if (i < options.columns.length) {
          let resizerWrap = document.createElement("div");
          resizerWrap.classList.add("zt-gantt-col-resizer-wrap");
          resizerWrap.id = "zt-gantt-col-resizer-wrap-r-" + i;
          resizerWrap.style.height = this.calculateScaleHeight(
            options.scales,
            options.scale_height,
            "header",
            0
          );

          if (options.columns[i].resize === true) {
            let resizer = document.createElement("div");
            resizer.classList.add("zt-gantt-col-resizer");
            resizerWrap.append(resizer);
            resizerLeft += options.columns[i].width || 80;
            resizerWrap.style.left = resizerLeft + "px";
            headCellContainer.append(resizerWrap);
            this.resizeColumns(
              resizerWrap,
              `data-column-index="r-${i}"`,
              headCell,
              headCellContainer,
              options.columns[i].min_width,
              options.columns[i].max_width,
              i,
              sidebar,
              true
            );
          }
        }
      }

      // data loop of left side
      let leftDataContainer = document.createElement("div");
      leftDataContainer.classList.add("zt-gantt-grid-data");
      leftDataContainer.id = "zt-gantt-left-grid";
      setTimeout(() => {
        leftDataContainer.style.width = sidebar.offsetWidth + "px";
      }, 0);
      // loop through all the data
      for (let j = 0; j < options.data.length; j++) {
        let dataItem = document.createElement("div");
        dataItem.classList.add("zt-gantt-row-item", "zt-gantt-d-flex");

        //add custom classes from user
        const { start_date, end_date } = this.getLargeAndSmallDate(
          options.data[j]
        );
        this.addClassesFromFunction(
          this.templates.grid_row_class,
          dataItem,
          start_date,
          end_date,
          this.options.data[j]
        );

        dataItem.setAttribute("zt-gantt-data-task-id", j);
        dataItem.setAttribute("zt-gantt-task-id", options.data[j].id);
        dataItem.style.height = options.row_height + "px";
        dataItem.style.lineHeight = options.row_height + "px";
        let that = this;
        // Handle mouseover event
        dataItem.addEventListener("mouseover", () =>
          this.updateTooltipBody(this.options.data[j])
        );

        // Handle mouseleave event
        dataItem.addEventListener("mouseleave", this.hideTooltip.bind(this));

        this.addClickListener(dataItem, (e) => {
          if (e.target.classList.contains("zt-gantt-tree-icon")) {
            return;
          }

          let selectedRows = document.querySelectorAll(".zt-gantt-selected");
          let selectedTaskBars = document.querySelectorAll(
            ".zt-gantt-selected-task-bar"
          );

          for (let item of selectedRows) {
            item.classList.remove("zt-gantt-selected");
          }

          for (let item of selectedTaskBars) {
            item.classList.remove("zt-gantt-selected-task-bar");
          }

          // select the selected task taskBar
          let currentTaskBar = document.querySelector(
            `[zt-gantt-taskbar-id="${options.data[j].id}"]`
          );
          currentTaskBar.classList.add("zt-gantt-selected-task-bar");

          let taskRow = document.querySelectorAll(
            `[zt-gantt-data-task-id="${j}"]`
          );
          for (let item of taskRow) {
            item.classList.add("zt-gantt-selected");
          }
          that.options.selectedRow = `${options.data[j].id}`;
          that.options.selectedTask = `${options.data[j].id}`;
        });

        // loop through all the columns
        for (let k = 0; k < options.columns.length; k++) {
          let cell = document.createElement("div");
          cell.classList.add("zt-gantt-cell");

          //add custom class from user
          this.addClassesFromFunction(
            this.templates.grid_cell_class,
            cell,
            this.options.columns[k],
            this.options.data[j]
          );

          cell.style.width = (options.columns[k].width || 80) + "px";
          options.columns[k].align
            ? (cell.style.textAlign = options.columns[k].align)
            : "";
          options.columns[k].align
            ? (cell.style.justifyContent = options.columns[k].align)
            : "";

          let content = document.createElement("div");
          content.classList.add(
            "zt-gantt-cell-data",
            `${k == 0 ? "zt-gantt-d-block" : "zt-gantt-data"}`
          );
          cell.setAttribute("data-column-index", `r-${k}`);

          let ztGanttBlank = document.createElement("div");
          ztGanttBlank.classList.add("zt-gantt-blank");

          ztGanttBlank.innerHTML = this.templates.grid_blank(options.data[j]);

          // content
          content.innerHTML =
            options.columns[k].template(options.data[j]) ||
            options.data[j][options.columns[k].name] ||
            " ";

          if (options.columns[k].tree) {
            cell.classList.add("zt-gantt-d-flex");

            // folder icon
            let folderIcon = document.createElement("div");
            folderIcon.classList.add("zt-gantt-folder-icon");
            folderIcon.innerHTML = this.templates.grid_folder(options.data[j]);

            if (
              options.data[j].children &&
              options.data[j].children.length > 0
            ) {
              // tree icon
              let treeIcon = document.createElement("div");
              treeIcon.classList.add(
                "zt-gantt-tree-icon",
                !this.options.openedTasks.includes(options.data[j].id)
                  ? "zt-gantt-tree-close"
                  : "zt-gantt-tree-open"
              );
              treeIcon.id = `toggle-tree-${j}`;
              cell.append(treeIcon);
              // toggle children
              let that = this;
              setTimeout(() => {
                let toggleTreeIcon = treeIcon;
                this.addClickListener(toggleTreeIcon, (event) => {
                  let children = document.getElementsByClassName(
                    `zt-gantt-child-${j}`
                  );

                  const isTaskOpened = toggleTreeIcon.classList.contains(
                    "zt-gantt-tree-close"
                  );

                  if (
                    toggleTreeIcon.classList.contains("zt-gantt-tree-close")
                  ) {
                    that.options.openedTasks.push(options.data[j].id);
                    for (const child of that.options.data[j].children) {
                      if (child.children) {
                        that.setCollapseAll(child.children, child.id, "open");
                      }
                    }
                  } else {
                    const openedTasks = that.options.openedTasks.indexOf(
                      options.data[j]
                    );
                    if (openedTasks > -1) {
                      that.options.openedTasks.splice(openedTasks, 1);
                    }
                    for (const child of this.options.data[j].children) {
                      if (child.children) {
                        that.setCollapseAll(
                          child.children,
                          child.id,
                          "collapse"
                        );
                      }
                    }
                  }

                  that.createTaskBars();

                  for (let i = 0; i < children.length; i++) {
                    children[i].classList.toggle("zt-gantt-d-none");
                    children[i].classList.toggle("zt-gantt-d-flex");
                  }

                  toggleTreeIcon.classList.toggle("zt-gantt-tree-close");
                  toggleTreeIcon.classList.toggle("zt-gantt-tree-open");

                  // custom event of toggle tree
                  that.dispatchEvent("onTaskToggle", {
                    task: that.options.data[j],
                    isTaskOpened,
                  });
                });
              }, 0);
            } else {
              cell.append(ztGanttBlank);
            }
            cell.append(folderIcon);
          }
          cell.append(content);
          dataItem.append(cell);
        }

        let isTaskExist = this.getTask(options.data[j].id, this.searchedData);
        if (!this.searchedData || isTaskExist) {
          leftDataContainer.append(dataItem);
        }

        this.createChildTask(
          options.data[j].children,
          options,
          leftDataContainer,
          1,
          j,
          true,
          this.options.openedTasks.includes(options.data[j].id)
        );
      }
      sidebar.append(leftDataContainer);

      let timelineResizerWrap = document.createElement("div");
      timelineResizerWrap.classList.add("zt-gantt-timeline-resizer-wrap");
      timelineResizerWrap.id = "zt-gantt-timeline-resizer-wrap";
      timelineResizerWrap.setAttribute("data-html2canvas-ignore", "true");
      let timelineResizer = document.createElement("div");
      timelineResizer.classList.add("zt-gantt-timeline-resizer");
      timelineResizerWrap.append(timelineResizer);
      setTimeout(() => {
        timelineResizerWrap.style.left = sidebar.offsetLeft + "px";
      }, 0);
      mainContainer.append(timelineResizerWrap);
      this.resizeTimeline(timelineResizerWrap, timelineResizer, options);
      mainContainer.append(sidebar);
    },

    // create Custom scrollBar
    createScrollbar: function (
      mainContainer,
      options,
      verScrollPos = 0,
      horScrollPos = 0
    ) {
      const layout = document.querySelector("#zt-gantt-layout");
      const timeline = document.querySelector("#zt-gantt-right-cell");
      const timelineData = document.querySelector("#zt-gantt-scale-data");
      const headerHeight = this.calculateScaleHeight(
        options.scales,
        options.scale_height,
        "scroll",
        0
      );
      const rightSideBar = document.querySelector("#zt-gantt-grid-right-data");

      const isVerScrollExist = document.querySelectorAll(
        ".zt-gantt-ver-scroll-cell"
      );
      const isHorScrollExist = document.querySelectorAll(
        ".zt-gantt-hor-scroll-cell"
      );

      // Create vertical custom scroll
      const verticalScrollContainer = createCustomScrollContainer(
        "zt-gantt-ver-scroll-cell"
      );
      const verticalScroll = createCustomScroll("zt-gantt-ver-scroll");
      verticalScroll.style.top = headerHeight + "px";
      verticalScroll.style.height = `calc(100% - ${headerHeight}px)`;
      const verScrollContent = document.createElement("div");
      verScrollContent.style.height = timelineData.scrollHeight - 1 + "px";
      verticalScroll.append(verScrollContent);
      verticalScrollContainer.append(verticalScroll);

      // if scrolls exist then remove them then create
      removeExistingScrollElements(isVerScrollExist);
      if (timeline.scrollHeight > timeline.offsetHeight) {
        mainContainer.append(verticalScrollContainer);
      }

      // Create horizontal custom scroll
      const horScrollContainer = createCustomScrollContainer(
        "zt-gantt-hor-scroll-cell"
      );
      const horScroll = createCustomScroll("zt-gantt-hor-scroll");
      const horScrollContent = document.createElement("div");
      horScrollContent.style.width =
        timeline.scrollWidth +
        (layout.offsetWidth - timeline.offsetWidth) +
        "px";
      horScroll.append(horScrollContent);
      horScrollContainer.append(horScroll);

      // if scrolls exist then remove them then create
      removeExistingScrollElements(isHorScrollExist);
      if (
        timeline.scrollWidth + (layout.offsetWidth - timeline.offsetWidth) >
        layout.offsetWidth
      ) {
        mainContainer.append(horScrollContainer);
      }

      const sidebar = document.querySelector("#zt-gantt-grid-left-data");
      const calendar = document.querySelector("#zt-gantt-right-cell");

      verticalScroll.scrollTop = verScrollPos || calendar.scrollTop;
      horScroll.scrollLeft = horScrollPos || calendar.scrollLeft;

      let that = this;
      calendar.removeEventListener("scroll", handleCalendarScroll);
      calendar.addEventListener("scroll", handleCalendarScroll);

      function handleCalendarScroll(e) {
        sidebar.scrollTop = calendar.scrollTop;
        horScroll.scrollLeft = calendar.scrollLeft;
        verticalScroll.scrollTop = calendar.scrollTop;
        if (rightSideBar) {
          rightSideBar.scrollTop = calendar.scrollTop;
        }

        that.dispatchEvent("onScroll", { event: e });
      }

      sidebar.removeEventListener("scroll", handleSidebarScroll);
      sidebar.addEventListener("scroll", handleSidebarScroll);

      function handleSidebarScroll() {
        calendar.scrollTop = sidebar.scrollTop;
        verticalScroll.scrollTop = sidebar.scrollTop;
        if (rightSideBar) {
          rightSideBar.scrollTop = sidebar.scrollTop;
        }
      }

      // for horizontal custom scroller
      horScroll.removeEventListener("scroll", handleHorScroll);
      horScroll.addEventListener("scroll", handleHorScroll);
      function handleHorScroll() {
        calendar.scrollLeft = horScroll.scrollLeft;
      }

      // for rightSideBar custom scroll
      if (rightSideBar) {
        rightSideBar.removeEventListener("scroll", handleRightSidebarScroll);
        rightSideBar.addEventListener("scroll", handleRightSidebarScroll);
        function handleRightSidebarScroll() {
          calendar.scrollTop = rightSideBar.scrollTop;
          verticalScroll.scrollTop = rightSideBar.scrollTop;
          sidebar.scrollTop = rightSideBar.scrollTop;
        }
      }

      // for vertical custom scroller
      verticalScroll.addEventListener("scroll", function () {
        calendar.scrollTop = verticalScroll.scrollTop;
        sidebar.scrollTop = verticalScroll.scrollTop;
        if (rightSideBar) {
          rightSideBar.scrollTop = verticalScroll.scrollTop;
        }
      });

      const timelineResizer = document.querySelector(
        "#zt-gantt-timeline-resizer-wrap"
      );
      if (timelineResizer) {
        timelineResizer.style.left =
          calendar.offsetLeft + calendar.offsetWidth + "px";
      }

      function createCustomScrollContainer(id) {
        const container = document.createElement("div");
        container.id = id;
        container.classList.add(id);
        container.setAttribute("data-html2canvas-ignore", true);
        return container;
      }

      function createCustomScroll(className) {
        const scroll = document.createElement("div");
        scroll.classList.add(className);
        return scroll;
      }

      function removeExistingScrollElements(scrollElements) {
        if (scrollElements) {
          for (let scroll of scrollElements) {
            scroll.remove();
          }
        }
      }

      if (
        this.options.mouseScroll &&
        (this.options.ctrlKeyRequiredForMouseScroll ||
          !this.options.selectAreaOnDrag)
      ) {
        this.addMouseScroll(verticalScroll, horScroll);
      }
    },

    resizeTimeline: function (resizer, resizerLine, options) {
      let timeLineResizing = false,
        that = this,
        startX,
        resizerLeft,
        size,
        leftResizer;

      resizer.removeEventListener("mousedown", handleMouseDown);
      resizer.addEventListener("mousedown", handleMouseDown);

      function handleMouseDown(event) {
        startX = event.x;
        leftResizer = document.querySelector(
          "#zt-gantt-left-layout-resizer-wrap"
        );
        resizerLeft = resizer.offsetLeft;
        resizerLine.style.backgroundColor = "#218eed";

        // mouse move event
        document.addEventListener("mousemove", resize, false);
        // mouseup event
        document.addEventListener("mouseup", handleMouseUp, false);
      }

      function handleMouseUp(e) {
        document.removeEventListener("mousemove", resize, false);
        document.removeEventListener("mouseup", handleMouseUp, false);
        if (timeLineResizing) {
          let rightSideBar = document.querySelector(
            "#zt-gantt-grid-right-data"
          );

          let widthSize = rightSideBar.offsetWidth + (startX - e.x);

          widthSize =
            leftResizer.offsetLeft + 80 >= size
              ? widthSize - (leftResizer.offsetLeft + 80 - size)
              : widthSize;

          const totalMinWidth = options.columns.reduce(
            (totalWidth, col) => totalWidth + (col.min_width || 80),
            0
          );

          widthSize = widthSize < totalMinWidth ? totalMinWidth : widthSize;

          rightSideBar.style.width = widthSize + "px";
          rightSideBar.style.minWidth = widthSize + "px";

          let resizerLeft = 0,
            headerCell = document.getElementsByClassName("right-head-cell");

          for (let j = 0; j < headerCell.length; j++) {
            let columns = document.querySelectorAll(
              `[data-column-index="r-${j}"]`
            );

            // let incrasedWidth = widthSize / options.columns.length;

            let resizerWrap = document.getElementById(
              `zt-gantt-col-resizer-wrap-r-${j}`
            );

            let colWidth =
              headerCell[j].offsetWidth +
              (startX - e.x) / options.columns.length;

            colWidth =
              colWidth < (options.columns[j]?.min_width || 80)
                ? options.columns[j]?.min_width || 80
                : colWidth;

            // set the sidebar columns width
            for (let col of columns) {
              col.style.width = colWidth + "px";
            }

            that.options.rightGrid[j].width = colWidth;

            // set the sidebar columns resizer left
            resizerLeft += headerCell[j].offsetWidth;
            if (resizerWrap) {
              resizerWrap.style.left = resizerLeft + "px";
            }
          }

          that.options.rightGridWidth = rightSideBar.offsetWidth;

          if (
            that.calculateTimeLineWidth("updated") ===
            that.calculateTimeLineWidth("current")
          ) {
            let mainContainer = document.querySelector(".zt-gantt-layout");
            that.createScrollbar(mainContainer, that.options);
          } else {
            // rerender the calendar and scale
            that.updateBody();
          }
        }
        resizerLine.style.backgroundColor = "#cecece";
        timeLineResizing = false;
      }

      // resize the sidebar
      function resize(e) {
        timeLineResizing = true;
        size = resizerLeft + (e.x - startX);
        resizer.style.left = `${size}px`;
      }
    },

    /**
     * Retrieves a task from the data based on its ID.
     * @param {number | string} id - The ID of the task to retrieve.
     * @param {Array} data - The data array to search for the task (defaults to options.data).
     * @returns {Object|null} - The task object if found, otherwise null.
     */
    getTask: function (id, data = this.options.data) {
      function findObjectById(array, id) {
        for (let item of array) {
          if (item.id == id) {
            return item;
          }

          if (Array.isArray(item.children)) {
            const found = findObjectById(item.children, id);
            if (found) {
              return found;
            }
          }
        }
        return null;
      }

      return findObjectById(data, id);
    },

    /**
     * Filter tasks based on user-defined conditions.
     * @param {Function} condition - The condition function used to filter tasks.
     * @param {boolean} isFilter - Indicates whether to apply the filter or reset.
     * @param {boolean} findRecursive - Indicates whether to find recursive parent-child tasks.
     */
    filterTask: function (condition, isFilter, findRecursive = false) {
      const debouncedFilterTask = this.debounce(
        (condition, isFilter, findRecursive = false) => {
          if (!this.searchedData) {
            this.oldOpenedTasks = [...this.options.openedTasks];
          }

          this.selectedRow = undefined;
          const allData = [...this.options.data];
          const that = this;
          let parents = [];

          if (!isFilter || this.searchedData) {
            this.searchedData = undefined;
            this.options.openedTasks = [];
            this.render();
            return;
          }

          const filteredData = filterAndFlatten(allData, condition);

          if (isFilter === true) {
            this.searchedData = filteredData;
            this.render();
          }

          function filterAndFlatten(data, condition) {
            return data.reduce((result, item) => {
              if (condition(item)) {
                if (!that.options.splitTask && !findRecursive) {
                  const { children, ...flatItem } = item;
                  result.push(flatItem);
                } else {
                  // find recursive parent child tasks
                  result.push(item);
                  let then = that;
                  pushParent(item);

                  function pushParent(item) {
                    if (
                      item.parent &&
                      item.parent != 0 &&
                      !parents.includes(item.parent)
                    ) {
                      parents.push(item.parent);
                      let parentItem = then.getTask(item.parent);
                      if (parentItem) {
                        parentItem.children = parentItem.children.filter(
                          (child) => child.id == item.id
                        );
                        result.push(parentItem);
                        pushParent(parentItem);
                      }
                    }
                  }
                }
              }
              if (Array.isArray(item.children)) {
                // Recursively filter and flatten nested arrays
                const filteredItems = filterAndFlatten(
                  item.children,
                  condition
                );
                result.push(...filteredItems);
              }
              return result;
            }, []);
          }
        },
        300
      );

      debouncedFilterTask(condition, isFilter, findRecursive);
    },

    // push custom markers
    addMarker: function (marker) {
      this.options.customMarker.push(marker);
    },

    // add custom marker to gantt
    addMarkerToGantt: function (data) {
      const markerStartDate = new Date(data.start_date);
      const isWeekend = this.options.weekends.includes(this.options.dateFormat.day_short[markerStartDate.getDay()])
      const isFullWeek = this.options.fullWeek

      if (!isFullWeek && isWeekend) return;

      const markerArea = this.markerArea;

      let flag = document.createElement("div");
      flag.classList.add(
        "zt-gantt-marker",
        ...data.css.trim().replace(/\s+/g, " ").split(" ")
      );
      flag.title = data.title;

      let flagText = document.createElement("div");
      flagText.classList.add("zt-gantt-marker-content");
      flagText.innerHTML = data.text;
      flag.append(flagText);

      let calendarContainer = document.getElementById("zt-gantt-scale-data");

      const startDate = new Date(this.options.startDate);
      let daysDiff = this.getDates(startDate, markerStartDate);

      if (!isFullWeek) {
        const filteredDates = this.filterWeekends(daysDiff);

        daysDiff = filteredDates.length - 1 || 0;
      } else {
        daysDiff = daysDiff.length - 1 || 0;
      }

      let colWidth = this.calculateGridWidth(data.start_date, "day");

      flag.style.left = colWidth * daysDiff + colWidth / 2 + "px";

        markerArea.append(flag);
    },

    /**
     * Attaches an event listener to the element and handles the event callback.
     *
     * @param {string} name - The name of the event to listen for.
     * @param {Function} callback - The callback function to execute when the event is triggered.
     */
    attachEvent: function (name, callback) {
      const eventNamesToCheck = [
        "onBeforeTaskDrag",
        "onBeforeTaskDrop",
        "onBeforeProgressDrag",
        "onBeforeLinkAdd",
        "onBeforeTaskDblClick",
      ];

      this.element.addEventListener(name, handleEvent);

      let that = this;

      function handleEvent(e) {
        if (eventNamesToCheck.includes(name)) {
          that.eventValue = callback(e.detail);
          that.eventValue = that.eventValue !== false;
        } else {
          callback(e.detail);
        }
      }
    },

    /**
     * Dispatches a custom event with the provided event name and detail.
     *
     * @param {string} eventName - The name of the custom event to dispatch.
     * @param {any} detail - Additional data to include with the event.
     */
    dispatchEvent: function (eventName, detail) {
      const event = new CustomEvent(eventName, { detail });
      this.element.dispatchEvent(event);
    },

    // get the position of a cell
    posFromDate: function (date) {
      date = new Date(date);
      const pxPerHour = this.calculateGridWidth(date) / 24;
      const hours = date.getHours();
      const pixels = Math.floor(hours * pxPerHour);
      let cellBefore = this.getDates(this.options.startDate, date);
      let isCellGreater = true;

      if (cellBefore.length === 0) {
        cellBefore = this.getDates(date, this.options.startDate);
        isCellGreater = false;
      }

      if (!this.options.fullWeek) {
        cellBefore = this.filterWeekends(cellBefore);
      }

      cellBefore = isCellGreater
        ? cellBefore.length - 1
        : -(cellBefore.length - 1);

      // return the left of the cell of given date
      return Math.floor(cellBefore * this.calculateGridWidth(date) + pixels);
    },

    clearAll: function () {
      this.options.arrangeData = true;
      this.options.openedTasks = [];
    },

    eachTask: function (callBack) {
      // Recursive function to iterate over nested data
      const iterateOverData = (array) => {
        array.forEach((task, index) => {
          callBack(task, array, index);
          if (Array.isArray(task.children)) {
            iterateOverData(task.children);
          }
        });
      };

      // Start iteration from the root of the data
      iterateOverData(this.options.data);
    },

    updateTaskDuration: function () {
      this.eachTask((task) => {
        let start_date = task.start_date;
        let end_date = task.end_date || task.start_date;

        if (task.children && task.children.length > 0) {
          let data = [...task.children];
          let { startDate, endDate } = this.getStartAndEndDate(data);

          const setDate = (date) => {
            const d = new Date(date);
            d.setHours(0, 0, 0, 0);
            return d;
          };

          const dates = [setDate(startDate), setDate(endDate)];

          if (start_date) {
            dates.push(setDate(start_date));
          }
          if (end_date) {
            dates.push(setDate(end_date));
          }

          start_date = new Date(Math.min(...dates));
          end_date = new Date(Math.max(...dates));
        }
        const dates = this.getDates(start_date, end_date);
        task.duration = dates.length;
      });
    },

    // open a specific task tree
    openTask: function (id) {
      if (
        id === null ||
        id === undefined ||
        this.options.openedTasks.includes(id)
      ) {
        return;
      }

      const sidebar = document.querySelector("#zt-gantt-left-grid");
      const taskRow = sidebar.querySelector(`[zt-gantt-task-id="${id}"]`);
      const children = document.querySelectorAll(`.zt-gantt-child-${id}`);
      const mainContainer = document.querySelector("#zt-gantt-layout");
      const toggleTreeIcon = taskRow.querySelector(".zt-gantt-tree-icon");

      let task = this.getTask(id);
      if (task.parent !== 0) {
        this.openTask(task.parent);
      }

      if (!this.options.openedTasks.includes(id)) {
        this.options.openedTasks.push(id);
      }
      this.createTaskBars();

      children.forEach((child) => {
        child.classList.remove("zt-gantt-d-none");
        child.classList.add("zt-gantt-d-flex");
      });

      if (toggleTreeIcon) {
        toggleTreeIcon.classList.remove("zt-gantt-tree-close");
        toggleTreeIcon.classList.add("zt-gantt-tree-open");
      }
      let verScroll =
        document.querySelector(".zt-gantt-ver-scroll")?.scrollTop || 0;
      let horScroll =
        document.querySelector(".zt-gantt-hor-scroll")?.scrollLeft || 0;
      this.createScrollbar(mainContainer, this.options, verScroll, horScroll);
    },

    // set the new data to the existing data
    parse: function (data) {
      const uniqueData = data.filter((obj) => !this.getTask(obj.id));

      this.options.data = [...this.originalData, ...uniqueData];
      this.options.arrangeData = true;

      if (this.options.collapse === false) {
        // Set opened tasks
        const uniqueIds = uniqueData.map((task) => task.id);
        this.options.openedTasks.push(...uniqueIds);
      }
    },

    // split hour and minutes from decimal
    convertDecimalToTime: function (decimalTime) {
      const hours = Math.floor(decimalTime);
      const minutes = Math.round((decimalTime - hours) * 60);
      return { hours, minutes };
    },

    // get time from pixels
    getTimeByPx: function (pixels, date) {
      let pxPerMin = this.calculateGridWidth(date, "day") / (24 * 60);
      let dateTime = pixels / pxPerMin / 60;
      let { hours, minutes } = this.convertDecimalToTime(dateTime);
      return { hours, minutes };
    },

    // get pixels from time
    getPxByTime: function (date, type) {
      let hours = new Date(date).getHours();
      if (type === "width") {
        hours = hours === 0 ? 0 : 23 - hours;
      }
      let pxPerHour = this.calculateGridWidth(date, "day") / 24;
      let pixels = hours * pxPerHour;
      return pixels;
    },

    /**
     * Creates links between tasks.
     * @param {string | number} sourceId - The id of the source task.
     * @param {string | number} targetId - The id of the target task.
     * @param {object} link - The link object containing link type information.
     */
    createLinks: function (sourceId, targetId, link) {
      let linksArea = document.querySelector("#zt-gantt-links-area");

      let source = document.querySelector(
        `[zt-gantt-taskbar-id="${sourceId}"]`
      );
      let target = document.querySelector(
        `[zt-gantt-taskbar-id="${targetId}"]`
      );

      let linkType = link.type || 0;

      const createLink = this.isTaskExistOrHidden(source, target);

      if (!createLink) {
        return;
      }

      let rowHeight = document.querySelector(".zt-gantt-bar-task").offsetHeight,
        sourceLeft = source.offsetLeft,
        sourceWidth = source.offsetWidth,
        sourceTop = source.offsetTop,
        targetLeft = target.offsetLeft,
        targetWidth = target.offsetWidth,
        targetTop = target.offsetTop,
        extraHeight =
          (this.options.row_height -
            Math.floor((this.options.row_height * 80) / 100)) /
            2 -
          1;

      let taskLink = document.createElement("div");
      taskLink.classList.add("zt-gantt-task-link");
      taskLink.setAttribute("link-id", link.id);
      taskLink.setAttribute("link-type", linkType);
      linksArea.append(taskLink);

      let that = this;
      // handle double click event
      taskLink.addEventListener("dblclick", function (e) {
        that.dispatchEvent("onLinkDblClick", { link });
      });

      let startLine = document.createElement("div");
      startLine.classList.add("zt-gantt-hor-link-line", "zt-gantt-link-line");

      let middleLine = document.createElement("div");
      middleLine.classList.add("zt-gantt-ver-link-line", "zt-gantt-link-line");

      let endLine = document.createElement("div");
      endLine.classList.add("zt-gantt-hor-link-line", "zt-gantt-link-line");

      let linkVerInnerLine = document.createElement("div");
      linkVerInnerLine.classList.add("ver-inner-line");

      let linkHorInnerLine = document.createElement("div");
      linkHorInnerLine.classList.add("hor-inner-line");

      if (linkType == 0) {
        startLine.style.left = sourceLeft + sourceWidth + "px";
        startLine.style.top = sourceTop + rowHeight / 2 + "px";
        startLine.style.width = 15 + "px";
        let innerHorLine = linkHorInnerLine.cloneNode(true);
        startLine.append(innerHorLine);
        taskLink.append(startLine);

        if (sourceLeft + sourceWidth + 15 >= targetLeft) {
          let middleLine = document.createElement("div");
          middleLine.classList.add(
            "zt-gantt-ver-link-line",
            "zt-gantt-link-line"
          );
          middleLine.style.left =
            startLine.offsetLeft + startLine.offsetWidth - 2 + "px";
          if (sourceTop < targetTop) {
            middleLine.style.top =
              Math.min(sourceTop, targetTop) + rowHeight / 2 + "px";
            middleLine.style.height =
              source.offsetHeight / 2 + (extraHeight + 2) + "px";
          } else {
            middleLine.style.top =
              Math.min(sourceTop, targetTop) +
              rowHeight +
              (extraHeight + 2) +
              "px";
            middleLine.style.height =
              Math.abs(sourceTop - targetTop) -
              rowHeight / 2 -
              extraHeight +
              "px";
          }
          let innerLine = linkVerInnerLine.cloneNode(true);
          middleLine.append(innerLine);
          taskLink.append(middleLine);

          let horLine = document.createElement("div");
          horLine.classList.add("zt-gantt-hor-link-line", "zt-gantt-link-line");
          horLine.style.left = targetLeft - 15 + "px";
          horLine.style.top =
            Math.min(sourceTop, targetTop) +
            source.offsetHeight +
            extraHeight +
            "px";
          horLine.style.width =
            Math.abs(
              startLine.offsetLeft + startLine.offsetWidth - targetLeft
            ) +
            15 +
            "px";
          let innerHorLine = linkHorInnerLine.cloneNode(true);
          horLine.append(innerHorLine);
          taskLink.append(horLine);
        }

        if (sourceLeft + sourceWidth + 15 >= targetLeft) {
          middleLine.style.left = target.offsetLeft - 15 + "px";
          if (sourceTop < targetTop) {
            middleLine.style.top =
              Math.min(sourceTop, targetTop) +
              rowHeight +
              (extraHeight + 2) +
              "px";
            middleLine.style.height =
              Math.abs(sourceTop - targetTop) -
              rowHeight / 2 -
              extraHeight +
              "px";
          } else {
            middleLine.style.top =
              Math.min(sourceTop, targetTop) + rowHeight / 2 + "px";
            middleLine.style.height =
              source.offsetHeight / 2 + extraHeight + "px";
          }
        } else {
          middleLine.style.left =
            startLine.offsetLeft + startLine.offsetWidth - 2 + "px";
          middleLine.style.top =
            Math.min(sourceTop, targetTop) + rowHeight / 2 + "px";
          middleLine.style.height = Math.abs(sourceTop - targetTop) + "px";
        }
        let innerLine = linkVerInnerLine.cloneNode(true);
        middleLine.append(innerLine);
        taskLink.append(middleLine);

        if (sourceLeft + sourceWidth + 15 >= targetLeft) {
          endLine.style.left = middleLine.offsetLeft + "px";
          endLine.style.top = targetTop + rowHeight / 2 + "px";
          endLine.style.width = 15 + "px";
        } else {
          endLine.style.left = middleLine.offsetLeft + "px";
          endLine.style.top = targetTop + rowHeight / 2 + "px";
          endLine.style.width =
            Math.abs(
              startLine.offsetLeft + startLine.offsetWidth - targetLeft
            ) + "px";
        }

        let innerEndLine = linkHorInnerLine.cloneNode(true);
        endLine.append(innerEndLine);
        taskLink.append(endLine);
      } else if (linkType == 1) {
        startLine.style.left = Math.min(sourceLeft, targetLeft) - 15 + "px";
        startLine.style.top = sourceTop + rowHeight / 2 + "px";
        if (sourceLeft > targetLeft) {
          startLine.style.width = Math.abs(sourceLeft - targetLeft) + 15 + "px";
        } else {
          startLine.style.width = 15 + "px";
        }
        let innerHorLine = linkVerInnerLine.cloneNode(true);
        startLine.append(innerHorLine);
        taskLink.append(startLine);

        if (sourceLeft >= targetLeft) {
          middleLine.style.left = target.offsetLeft - 15 + "px";
          middleLine.style.top =
            Math.min(sourceTop, targetTop) + rowHeight / 2 + "px";
          middleLine.style.height = Math.abs(sourceTop - targetTop) + "px";
        } else {
          middleLine.style.left = startLine.offsetLeft + "px";
          middleLine.style.top =
            Math.min(sourceTop, targetTop) + rowHeight / 2 + "px";
          middleLine.style.height = Math.abs(sourceTop - targetTop) + "px";
        }
        let innerLine = linkVerInnerLine.cloneNode(true);
        middleLine.append(innerLine);
        taskLink.append(middleLine);

        endLine.style.left = middleLine.offsetLeft + "px";
        endLine.style.top = targetTop + rowHeight / 2 + "px";
        endLine.style.width = targetLeft - middleLine.offsetLeft + "px";
        let innerEndLine = linkHorInnerLine.cloneNode(true);
        endLine.append(innerEndLine);
        taskLink.append(endLine);
      } else if (linkType == 2) {
        startLine.style.left = `${sourceLeft + sourceWidth}px`;
        startLine.style.top = `${sourceTop + rowHeight / 2}px`;
        if (sourceLeft + sourceWidth < targetLeft + targetWidth) {
          startLine.style.width = `${
            Math.abs(sourceLeft + sourceWidth - (targetLeft + targetWidth)) + 15
          }px`;
        } else {
          startLine.style.width = `${15}px`;
        }
        let innerHorLine = linkHorInnerLine.cloneNode(true);
        startLine.append(innerHorLine);
        taskLink.append(startLine);

        middleLine.style.left = `${
          startLine.offsetLeft + startLine.offsetWidth
        }px`;
        middleLine.style.top = `${
          Math.min(sourceTop, targetTop) + rowHeight / 2
        }px`;
        middleLine.style.height = `${Math.abs(sourceTop - targetTop) + 2}px`;
        let innerLine = linkVerInnerLine.cloneNode(true);
        middleLine.append(innerLine);
        taskLink.append(middleLine);

        endLine.style.left = `${targetLeft + targetWidth}px`;
        endLine.style.top = `${targetTop + rowHeight / 2}px`;
        endLine.style.width = `${
          Math.abs(targetLeft + targetWidth - middleLine.offsetLeft) + 2
        }px`;
        let innerEndHorLine = linkHorInnerLine.cloneNode(true);
        endLine.append(innerEndHorLine);
        taskLink.append(endLine);
      } else if (linkType == 3) {
        if (sourceLeft > targetLeft + targetWidth) {
          startLine.style.left = `${targetLeft + targetWidth + 15}px`;
          startLine.style.width = `${
            sourceLeft - (targetLeft + targetWidth) - 15
          }px`;
        } else {
          startLine.style.left = `${sourceLeft - 15}px`;
          startLine.style.width = `${15}px`;
        }
        startLine.style.top = `${sourceTop + rowHeight / 2}px`;
        let innerHorLine = linkHorInnerLine.cloneNode(true);
        startLine.append(innerHorLine);
        taskLink.append(startLine);

        if (sourceLeft <= targetLeft + targetWidth) {
          let middleLine = document.createElement("div");
          middleLine.classList.add(
            "zt-gantt-ver-link-line",
            "zt-gantt-link-line"
          );
          middleLine.style.left = `${startLine.offsetLeft}px`;
          if (sourceTop < targetTop) {
            middleLine.style.top = `${
              Math.min(sourceTop, targetTop) + rowHeight / 2
            }px`;
            middleLine.style.height = `${
              source.offsetHeight / 2 + (extraHeight + 2)
            }px`;
          } else {
            middleLine.style.top = `${
              Math.min(sourceTop, targetTop) + rowHeight + (extraHeight + 2)
            }px`;
            middleLine.style.height = `${
              Math.abs(sourceTop - targetTop) - rowHeight / 2 - extraHeight
            }px`;
          }
          let innerLine = linkVerInnerLine.cloneNode(true);
          middleLine.append(innerLine);
          taskLink.append(middleLine);

          let horLine = document.createElement("div");
          horLine.classList.add("zt-gantt-hor-link-line", "zt-gantt-link-line");
          horLine.style.left = `${startLine.offsetLeft}px`;
          horLine.style.top = `${
            Math.min(sourceTop, targetTop) + source.offsetHeight + extraHeight
          }px`;
          horLine.style.width = `${
            Math.abs(targetLeft + targetWidth - startLine.offsetLeft) + 15
          }px`;
          let innerHorLine = linkHorInnerLine.cloneNode(true);
          horLine.append(innerHorLine);
          taskLink.append(horLine);
        }

        middleLine.style.left = `${targetLeft + targetWidth + 15}px`;
        if (sourceTop < targetTop) {
          if (sourceLeft > targetLeft + targetWidth) {
            middleLine.style.top = `${
              Math.min(sourceTop, targetTop) + rowHeight / 2
            }px`;
            middleLine.style.height = `${
              Math.abs(sourceTop - targetTop) + 2
            }px`;
          } else {
            middleLine.style.top = `${
              Math.min(sourceTop, targetTop) + rowHeight + extraHeight
            }px`;
            middleLine.style.height = `${
              Math.abs(sourceTop - targetTop) - rowHeight / 2 - extraHeight + 2
            }px`;
          }
        } else {
          middleLine.style.top = `${
            Math.min(sourceTop, targetTop) + rowHeight / 2
          }px`;
          if (sourceLeft > targetLeft + targetWidth) {
            middleLine.style.height = `${Math.abs(sourceTop - targetTop)}px`;
          } else {
            middleLine.style.height = `${
              source.offsetHeight / 2 + (extraHeight + 2)
            }px`;
          }
        }
        let innerLine = linkVerInnerLine.cloneNode(true);
        middleLine.append(innerLine);
        taskLink.append(middleLine);

        endLine.style.left = `${targetLeft + targetWidth}px`;
        endLine.style.top = `${targetTop + rowHeight / 2}px`;
        endLine.style.width = `${15}px`;
        let innerEndLine = linkHorInnerLine.cloneNode(true);
        endLine.append(innerEndLine);
        taskLink.append(endLine);
      }

      if (this.options.updateLinkOnDrag) {
        // call updateLinkPosition function onTaskDrag
        this.attachEvent("onTaskDrag", (e) => {
          this.updateLinkPosition(source, target, taskLink, rowHeight, link);
        });
      }

      // call updateLinkPosition function onAfterTaskDrag
      this.attachEvent("onAfterTaskDrag", (e) => {
        this.updateLinkPosition(source, target, taskLink, rowHeight, link);
      });

      // call updateLinkPosition function onAutoScheduling
      this.attachEvent("onAutoScheduling", (e) => {
        this.updateLinkPosition(source, target, taskLink, rowHeight, link);
      });
    },

    /**
     * Function to update the position of a link between two tasks.
     * @param {HTMLElement} source - The source task element.
     * @param {HTMLElement} target - The target task element.
     * @param {HTMLElement} link - The link element.
     * @param {number} rowHeight - The height of a row.
     * @param {object} linkObj - The link object containing information about the link.
     */
    updateLinkPosition: function (source, target, link, rowHeight, linkObj) {
      let sourceLeft = source.offsetLeft,
        sourceWidth = source.offsetWidth,
        sourceTop = source.offsetTop,
        targetLeft = target.offsetLeft,
        targetWidth = target.offsetWidth,
        targetTop = target.offsetTop,
        extraHeight =
          (this.options.row_height -
            Math.floor((this.options.row_height * 80) / 100)) /
            2 -
          1;

      let taskLink = document.createElement("div");
      taskLink.setAttribute("link-id", linkObj.id);
      taskLink.classList.add("zt-gantt-task-link");

      let startLine = document.createElement("div");
      startLine.classList.add("zt-gantt-hor-link-line", "zt-gantt-link-line");

      let middleLine = document.createElement("div");
      middleLine.classList.add("zt-gantt-ver-link-line", "zt-gantt-link-line");

      let endLine = document.createElement("div");
      endLine.classList.add("zt-gantt-hor-link-line", "zt-gantt-link-line");

      let linkVerInnerLine = document.createElement("div");
      linkVerInnerLine.classList.add("ver-inner-line");

      let linkHorInnerLine = document.createElement("div");
      linkHorInnerLine.classList.add("hor-inner-line");

      let linkType = linkObj.type || 0;

      if (linkType === 0) {
        startLine.style.left = sourceLeft + sourceWidth + "px";
        startLine.style.top = sourceTop + rowHeight / 2 + "px";
        startLine.style.width = 15 + "px";
        let innerHorLine = linkHorInnerLine.cloneNode(true);
        startLine.append(innerHorLine);
        taskLink.append(startLine);

        if (sourceLeft + sourceWidth + 15 >= targetLeft) {
          let middleLine = document.createElement("div");
          middleLine.classList.add(
            "zt-gantt-ver-link-line",
            "zt-gantt-link-line"
          );
          middleLine.style.left = sourceLeft + sourceWidth + 15 + "px";
          if (sourceTop < targetTop) {
            middleLine.style.top =
              Math.min(sourceTop, targetTop) + rowHeight / 2 + "px";
            middleLine.style.height =
              source.offsetHeight / 2 + (extraHeight + 2) + "px";
          } else {
            if (Math.abs(sourceTop - targetTop) <= rowHeight / 2) {
              middleLine.style.top =
                Math.min(sourceTop, targetTop) +
                rowHeight / 2 +
                Math.abs(sourceTop - targetTop) +
                "px";
              middleLine.style.height =
                Math.abs(
                  sourceTop - targetTop - rowHeight / 2 - (extraHeight + 2)
                ) + "px";
            } else {
              middleLine.style.top =
                Math.min(sourceTop, targetTop) + rowHeight + extraHeight + "px";
              middleLine.style.height =
                Math.abs(sourceTop - targetTop) - rowHeight / 2 + 1 + "px";
            }
          }
          let innerLine = linkVerInnerLine.cloneNode(true);
          middleLine.append(innerLine);
          taskLink.append(middleLine);

          let horLine = document.createElement("div");
          horLine.classList.add("zt-gantt-hor-link-line", "zt-gantt-link-line");
          horLine.style.left = targetLeft - 15 + "px";
          horLine.style.top =
            Math.min(sourceTop, targetTop) +
            source.offsetHeight +
            extraHeight +
            "px";
          if (0 < sourceLeft + sourceWidth + 15 - targetLeft <= 15) {
            horLine.style.width =
              Math.abs(sourceLeft + sourceWidth + 15 - targetLeft) + 15 + "px";
          } else {
            horLine.style.width =
              Math.abs(sourceLeft + sourceWidth - targetLeft) + 30 + "px";
          }
          let innerHorLine = linkHorInnerLine.cloneNode(true);
          horLine.append(innerHorLine);
          taskLink.append(horLine);
        }

        if (sourceLeft + sourceWidth + 15 >= targetLeft) {
          middleLine.style.left = target.offsetLeft - 15 + "px";
          if (sourceTop < targetTop) {
            if (Math.abs(sourceTop - targetTop) <= rowHeight / 2) {
              middleLine.style.top =
                Math.min(sourceTop, targetTop) +
                rowHeight / 2 +
                Math.abs(sourceTop - targetTop) +
                "px";
              middleLine.style.height =
                Math.abs(sourceTop - targetTop + rowHeight / 2 + extraHeight) +
                "px";
            } else {
              middleLine.style.top =
                Math.min(sourceTop, targetTop) +
                rowHeight +
                (extraHeight + 2) +
                "px";
              middleLine.style.height =
                Math.abs(sourceTop - targetTop) -
                rowHeight / 2 -
                extraHeight +
                "px";
            }
          } else {
            middleLine.style.top =
              Math.min(sourceTop, targetTop) + rowHeight / 2 + "px";
            middleLine.style.height =
              source.offsetHeight / 2 + extraHeight + "px";
          }
        } else {
          middleLine.style.left = sourceLeft + sourceWidth + 13 + "px";
          middleLine.style.top =
            Math.min(sourceTop, targetTop) + rowHeight / 2 + 2 + "px";
          middleLine.style.height = Math.abs(sourceTop - targetTop) + "px";
        }
        let innerLine = linkVerInnerLine.cloneNode(true);
        middleLine.append(innerLine);
        taskLink.append(middleLine);

        if (sourceLeft + sourceWidth + 15 >= targetLeft) {
          endLine.style.left = targetLeft - 15 + "px";
          endLine.style.top = targetTop + rowHeight / 2 + "px";
          endLine.style.width = 15 + "px";
        } else {
          endLine.style.left = sourceLeft + sourceWidth + 13 + "px";
          endLine.style.top = targetTop + rowHeight / 2 + "px";
          endLine.style.width =
            Math.abs(sourceLeft + sourceWidth + 15 - targetLeft) + "px";
        }
        let innerEndLine = linkHorInnerLine.cloneNode(true);
        endLine.append(innerEndLine);
        taskLink.append(endLine);
      } else if (linkType === 1) {
        startLine.style.left = Math.min(sourceLeft, targetLeft) - 15 + "px";
        startLine.style.top = sourceTop + rowHeight / 2 + "px";
        if (sourceLeft > targetLeft) {
          startLine.style.width = Math.abs(sourceLeft - targetLeft) + 15 + "px";
        } else {
          startLine.style.width = 15 + "px";
        }
        let innerHorLine = linkHorInnerLine.cloneNode(true);
        startLine.append(innerHorLine);
        taskLink.append(startLine);

        if (sourceLeft >= targetLeft) {
          middleLine.style.left = targetLeft - 15 + "px";
          middleLine.style.top =
            Math.min(sourceTop, targetTop) + rowHeight / 2 + "px";
          middleLine.style.height = Math.abs(sourceTop - targetTop) + "px";
        } else {
          middleLine.style.left = Math.min(sourceLeft, targetLeft) - 15 + "px";
          middleLine.style.top =
            Math.min(sourceTop, targetTop) + rowHeight / 2 + "px";
          middleLine.style.height = Math.abs(sourceTop - targetTop) + "px";
        }
        let innerLine = linkVerInnerLine.cloneNode(true);
        middleLine.append(innerLine);
        taskLink.append(middleLine);

        endLine.style.left = `${Math.min(targetLeft, sourceLeft) - 15}px`;
        endLine.style.top = `${targetTop + rowHeight / 2}px`;
        endLine.style.width = `${
          targetLeft - (Math.min(targetLeft, sourceLeft) - 15)
        }px`;
        let innerEndLine = linkHorInnerLine.cloneNode(true);
        endLine.append(innerEndLine);
        taskLink.append(endLine);
      } else if (linkType === 2) {
        startLine.style.left = `${sourceLeft + sourceWidth}px`;
        startLine.style.top = `${sourceTop + rowHeight / 2}px`;
        if (sourceLeft + sourceWidth < targetLeft + targetWidth) {
          startLine.style.width = `${
            Math.abs(sourceLeft + sourceWidth - (targetLeft + targetWidth)) + 15
          }px`;
        } else {
          startLine.style.width = `${15}px`;
        }
        let innerHorLine = linkHorInnerLine.cloneNode(true);
        startLine.append(innerHorLine);
        taskLink.append(startLine);

        middleLine.style.left = `${
          Math.max(targetLeft + targetWidth, sourceLeft + sourceWidth) + 15
        }px`;
        middleLine.style.top = `${
          Math.min(sourceTop, targetTop) + rowHeight / 2
        }px`;
        middleLine.style.height = `${Math.abs(sourceTop - targetTop) + 2}px`;
        let innerLine = linkVerInnerLine.cloneNode(true);
        middleLine.append(innerLine);
        taskLink.append(middleLine);

        endLine.style.left = `${targetLeft + targetWidth}px`;
        endLine.style.top = `${targetTop + rowHeight / 2}px`;
        if (sourceLeft + sourceWidth < targetLeft + targetWidth) {
          endLine.style.width = `${15}px`;
        } else {
          endLine.style.width = `${
            Math.abs(targetLeft + targetWidth - (sourceLeft + sourceWidth)) + 15
          }px`;
        }
        let innerEndLine = linkHorInnerLine.cloneNode(true);
        endLine.append(innerEndLine);
        taskLink.append(endLine);
      } else if (linkType === 3) {
        startLine.style.top = `${sourceTop + rowHeight / 2}px`;
        if (sourceLeft > targetLeft + targetWidth + 30) {
          startLine.style.left = `${targetLeft + targetWidth + 15}px`;
          startLine.style.width = `${
            sourceLeft - (targetLeft + targetWidth) - 15
          }px`;
        } else {
          startLine.style.left = `${sourceLeft - 15}px`;
          startLine.style.width = `${15}px`;
        }
        let innerHorLine = linkHorInnerLine.cloneNode(true);
        startLine.append(innerHorLine);
        taskLink.append(startLine);

        if (sourceLeft - 30 < targetLeft + targetWidth) {
          let middleLine = document.createElement("div");
          middleLine.classList.add(
            "zt-gantt-ver-link-line",
            "zt-gantt-link-line"
          );
          middleLine.style.left = `${sourceLeft - 15}px`;
          if (sourceTop < targetTop) {
            middleLine.style.top = `${
              Math.min(sourceTop, targetTop) + rowHeight / 2
            }px`;
            middleLine.style.height = `${
              source.offsetHeight / 2 + (extraHeight + 2)
            }px`;
          } else {
            if (Math.abs(sourceTop - targetTop) <= rowHeight / 2) {
              middleLine.style.top =
                Math.min(sourceTop, targetTop) +
                rowHeight / 2 +
                Math.abs(sourceTop - targetTop) +
                "px";
              middleLine.style.height =
                Math.abs(
                  sourceTop - targetTop - rowHeight / 2 - (extraHeight + 2)
                ) + "px";
            } else {
              middleLine.style.top = `${
                Math.min(sourceTop, targetTop) + rowHeight + (extraHeight + 2)
              }px`;
              middleLine.style.height = `${
                Math.abs(sourceTop - targetTop) - rowHeight / 2 - extraHeight
              }px`;
            }
          }
          let innerLine = linkVerInnerLine.cloneNode(true);
          middleLine.append(innerLine);
          taskLink.append(middleLine);

          let horLine = document.createElement("div");
          horLine.classList.add("zt-gantt-hor-link-line", "zt-gantt-link-line");
          horLine.style.left = `${sourceLeft - 15}px`;
          horLine.style.top = `${
            Math.min(sourceTop, targetTop) + source.offsetHeight + extraHeight
          }px`;
          if (sourceLeft > targetLeft + targetWidth) {
            horLine.style.width = `${Math.abs(
              targetLeft + targetWidth + 15 - (sourceLeft - 15)
            )}px`;
          } else {
            horLine.style.width = `${
              Math.abs(targetLeft + targetWidth - sourceLeft) + 30
            }px`;
          }
          let innerHorLine = linkHorInnerLine.cloneNode(true);
          horLine.append(innerHorLine);
          taskLink.append(horLine);
        }

        middleLine.style.left = `${targetLeft + targetWidth + 15}px`;
        if (sourceTop < targetTop) {
          if (sourceLeft - 15 >= targetLeft + targetWidth + 15) {
            middleLine.style.top = `${
              Math.min(sourceTop, targetTop) + rowHeight / 2 + 2
            }px`;
            middleLine.style.height = `${Math.abs(sourceTop - targetTop)}px`;
          } else {
            if (Math.abs(sourceTop - targetTop) <= rowHeight / 2) {
              middleLine.style.top =
                Math.min(sourceTop, targetTop) +
                rowHeight / 2 +
                Math.abs(sourceTop - targetTop) +
                "px";
              middleLine.style.height =
                Math.abs(
                  sourceTop - targetTop + rowHeight / 2 + extraHeight + 2
                ) + "px";
            } else {
              middleLine.style.top = `${
                Math.min(sourceTop, targetTop) + rowHeight + extraHeight
              }px`;
              middleLine.style.height = `${
                Math.abs(sourceTop - targetTop) -
                rowHeight / 2 -
                extraHeight +
                2
              }px`;
            }
          }
        } else {
          middleLine.style.top = `${
            Math.min(sourceTop, targetTop) + rowHeight / 2
          }px`;
          if (sourceLeft - 15 >= targetLeft + targetWidth + 15) {
            middleLine.style.height = `${Math.abs(sourceTop - targetTop)}px`;
          } else {
            middleLine.style.height = `${
              source.offsetHeight / 2 + (extraHeight + 2)
            }px`;
          }
        }
        let innerLine = linkVerInnerLine.cloneNode(true);
        middleLine.append(innerLine);
        taskLink.append(middleLine);

        endLine.style.left = `${targetLeft + targetWidth}px`;
        endLine.style.top = `${targetTop + rowHeight / 2}px`;
        endLine.style.width = `${15}px`;
        let innerEndLine = linkHorInnerLine.cloneNode(true);
        endLine.append(innerEndLine);
        taskLink.append(endLine);
      }
      link.innerHTML = taskLink.innerHTML;
    },

    /**
     * Function to delete a link by its ID.
     * @param {string | number} id - The ID of the link to be deleted.
     */
    deleteLink: function (id) {
      let link = document.querySelector(`[link-id="${id}"]`);
      if (link !== undefined && link !== null) {
        link.remove();
        const linkIndex = this.options.links.findIndex((obj) => obj.id == id);
        const linkobj = this.options.links.find((obj) => obj.id === id) || null;
        if (linkIndex !== -1) {
          this.options.links.splice(linkIndex, 1);
        }

        this.dispatchEvent("onDeleteLink", { link: linkobj });
      }
    },

    /**
     * Function to create a new link between two tasks.
     * @param {HTMLElement} linkPoint - The link point element.
     * @param {HTMLElement} source - The source task element.
     * @param {string | number} sourceId - The ID of the source task.
     * @param {string} type - The type of link point ('left' or 'right').
     */
    createNewLink: function (linkPoint, source, sourceId, type) {
      let strech = false,
        startX,
        startY,
        targetId,
        targetType,
        that = this,
        autoScroll = false,
        rightPanelScroll,
        barsArea;

      linkPoint.removeEventListener("mousedown", handleMouseDown);
      linkPoint.addEventListener("mousedown", handleMouseDown);

      function handleMouseDown(e) {
        rightPanelScroll = document.getElementById("zt-gantt-right-cell");
        barsArea = document.getElementById("zt-gantt-bars-area");
        startX = e.clientX + rightPanelScroll.scrollLeft;
        startY = e.clientY + rightPanelScroll.scrollTop;

        barsArea.classList.add("zt-gantt-link-streching");
        source.classList.add("source");

        document.addEventListener("mousemove", strechLink, false);
        document.addEventListener("mouseup", handleMouseUp, false);
      }

      function handleMouseUp(e) {
        autoScroll = false;
        document.removeEventListener("mousemove", strechLink, false);
        document.removeEventListener("mouseup", handleMouseUp, false);

        let selectedTarget = document.querySelector(".selected-target");
        if (selectedTarget !== undefined && selectedTarget !== null) {
          selectedTarget.classList.remove("selected-target");
        }

        barsArea.classList.remove("zt-gantt-link-streching");
        source.classList.remove("source");

        if (strech) {
          document.querySelector(".zt-gantt-link-direction").remove();
          let linkType =
            type === "left" && targetType === "left"
              ? 1
              : type === "right" && targetType === "right"
              ? 2
              : type === "left" && targetType === "right"
              ? 3
              : 0;
          let isLinkExist = that.options.links.some(
            (obj) =>
              obj.source == sourceId &&
              obj.target == targetId &&
              obj.type == linkType
          );

          targetId =
            isNaN(targetId) || targetId === null ? targetId : +targetId;

          let hasCycle = that.hasCycle(sourceId, targetId);

          // handle custom event
          that.dispatchEvent("onBeforeLinkAdd", {
            sourceId,
            targetId,
            type: linkType,
          });

          if (that.eventValue === false) {
            that.eventValue = true;
            return;
          }

          if (
            targetId !== undefined &&
            targetId !== null &&
            targetId != sourceId &&
            !isLinkExist &&
            !hasCycle
          ) {
            link = {
              id: `${linkType}-${sourceId}-${targetId}`,
              source: sourceId,
              target: targetId,
              type: linkType,
            };
            that.createLinks(sourceId, targetId, link);
            that.options.links.push(link);

            // handle custom event
            that.dispatchEvent("onLinkAdd", { link });
          }
        }
        strech = false;
      }

      function strechLink(e) {
        strech = true;

        let linkDirection;
        let isLinkDirectionExist = document.querySelector(
          ".zt-gantt-link-direction"
        );
        let linksArea = document.querySelector("#zt-gantt-links-area");
        if (!isLinkDirectionExist) {
          linkDirection = document.createElement("div");
          linkDirection.classList.add("zt-gantt-link-direction");
          linksArea.append(linkDirection);
        } else {
          linkDirection = isLinkDirectionExist;
        }

        linkDirection.style.left =
          (type === "right"
            ? source.offsetLeft + source.offsetWidth
            : source.offsetLeft) + "px";
        linkDirection.style.top =
          source.offsetTop + source.offsetHeight / 2 + "px";
        let base = Math.abs(
          e.clientX -
            (startX -
              (type === "left" && e.clientX - startX > 0
                ? -20
                : type === "left" && e.clientX - startX < 0
                ? 0
                : e.clientX - startX > 0
                ? 0
                : 20) -
              rightPanelScroll.scrollLeft)
        );
        let perp = Math.abs(e.clientY - (startY - rightPanelScroll.scrollTop));
        let hypo = Math.sqrt(base * base + perp * perp);
        linkDirection.style.width = hypo + "px";

        let scrollSpeed = 5;

        function startAutoScroll(type) {
          if (type === "right") {
            rightPanelScroll.scrollLeft += scrollSpeed;
            if (
              rightPanelScroll.scrollLeft >=
              rightPanelScroll.scrollWidth - rightPanelScroll.clientWidth
            ) {
              autoScroll = false;
              return;
            }
          } else if (type === "left") {
            rightPanelScroll.scrollLeft -= scrollSpeed;
            if (rightPanelScroll.scrollLeft <= 0) {
              autoScroll = false;
              return;
            }
          } else if (type === "top") {
            rightPanelScroll.scrollTop += scrollSpeed;
            if (rightPanelScroll.scrollTop <= 0) {
              autoScroll = false;
              return;
            }
          } else if (type === "bottom") {
            rightPanelScroll.scrollTop -= scrollSpeed;
            if (
              rightPanelScroll.scrollTop >=
              rightPanelScroll.scrollHeight - rightPanelScroll.clientHeight
            ) {
              autoScroll = false;
              return;
            }
          }
          if (autoScroll) {
            setTimeout(() => {
              startAutoScroll(type);
            }, 50); // Adjust the scroll delay by changing the value here
          }
        }

        const scrollContainer =
          that.element.offsetLeft + rightPanelScroll.offsetLeft;
        const scrollThresholdRight =
          scrollContainer + rightPanelScroll.offsetWidth - 30;
        const scrollThresholdLeft = scrollContainer + 30;

        // auto scroll the div left and right
        if (e.clientX > scrollThresholdRight - window.scrollX) {
          autoScroll = true;
          startAutoScroll("right");
        } else if (e.clientX < scrollThresholdLeft - window.scrollX) {
          autoScroll = true;
          startAutoScroll("left");
        } else {
          autoScroll = false;
        }

        const scrollContainerTop =
          that.element.offsetTop + rightPanelScroll.offsetHeight;
        const scrollThresholdTop = scrollContainerTop - 30;
        const scrollThresholdBottom =
          that.element.offsetTop +
          that.calculateScaleHeight(
            that.options.scales,
            that.options.scale_height,
            "scroll",
            0
          ) +
          30;

        // auto scroll the div top and bottom
        if (e.clientY > scrollThresholdTop - window.scrollY) {
          autoScroll = true;
          startAutoScroll("top");
        } else if (e.clientY < scrollThresholdBottom - window.scrollY) {
          autoScroll = true;
          startAutoScroll("bottom");
        }

        // Retrieve the mouse coordinates from the event
        let mouseX = e.pageX;
        let mouseY = e.pageY;

        // Calculate the differences between the mouse coordinates and the point coordinates
        let deltaX =
          mouseX -
          (startX -
            (type === "left" ? -20 : 20) -
            rightPanelScroll.scrollLeft +
            window.scrollX);
        let deltaY =
          mouseY - (startY - rightPanelScroll.scrollTop + window.scrollY);

        // Calculate the angle in radians
        let radians = Math.atan2(deltaY, deltaX);
        linkDirection.style.transform = `rotate(${radians}rad)`;
        if (e.target.classList.contains("zt-gantt-link-point")) {
          targetId = e.target.parentElement.parentElement.getAttribute(
            "zt-gantt-taskbar-id"
          );
          targetType = e.target.parentElement.classList.contains(
            "zt-gantt-left-point"
          )
            ? "left"
            : "right";
          if (targetId != sourceId) {
            e.target.classList.add("selected-target");
          }
        } else {
          targetId = null;
          targetType = undefined;
          let selectedTarget = document.querySelector(".selected-target");
          if (selectedTarget !== undefined && selectedTarget !== null) {
            selectedTarget.classList.remove("selected-target");
          }
        }
      }
    },

    // function to show loader
    showLoader: function () {
      const ztLoader = document.createElement("span");
      const ztLoaderDrop = document.createElement("div");

      ztLoader.id = "zt-gantt-loader";
      ztLoader.classList.add("zt-gantt-loader");
      ztLoaderDrop.classList.add("zt-gantt-loader-drop");

      document.body.append(ztLoaderDrop, ztLoader);
    },

    // function to hide loader
    hideLoader: function () {
      const ztLoader = document.querySelector("#zt-gantt-loader");
      const ztLoaderDrop = document.querySelector(".zt-gantt-loader-drop");

      if (ztLoader) {
        ztLoader.remove();
      }

      if (ztLoaderDrop) {
        ztLoaderDrop.remove();
      }
    },

    // function to initialize zoom options
    zoomInit: function (type = "after") {
      let zoomLevels = this.options.zoomConfig;
      for (levels of zoomLevels.levels) {
        if (this.options.zoomLevel == levels.name) {
          this.options.scale_height =
            levels.scale_height || this.options.scale_height;
          this.options.minColWidth =
            levels.min_col_width || this.options.minColWidth;
          this.options.scales = levels.scales;
          break;
        }
      }

      if (type !== "initial") {
        this.render();
      }
    },

    // function to get the number of days in  a month of a date
    getDaysInMonth: function (dateString) {
      const date = new Date(dateString);
      const year = date.getFullYear();
      const month = date.getMonth();

      const daysInMonth = new Date(year, month + 1, 0).getDate();

      return daysInMonth;
    },

    // function to get the days in quarter of a date
    getDaysInQuarter: function (dateString) {
      const date = new Date(dateString);
      const year = date.getFullYear();
      const month = date.getMonth();

      const quarterStartMonth = Math.floor(month / 3) * 3;
      const quarterStartDate = new Date(year, quarterStartMonth, 1);
      const quarterEndDate = new Date(year, quarterStartMonth + 3, 0);

      const daysInQuarter =
        (quarterEndDate - quarterStartDate) / (1000 * 60 * 60 * 24) + 1;

      return daysInQuarter;
    },

    // function to get the quarter of a date
    getQuarterOfDate: function (date) {
      date = new Date(date);
      // Get the month from the date (0-11)
      const month = date.getMonth();
      // Calculate the quarter
      const quarter = Math.floor(month / 3) + 1;
      return quarter;
    },

    // function to get the current zoom level scale
    getScale: function () {
      let scaleObj = {
        unit: this.options.zoomLevel,
        step: 1,
        startDate: this.options.startDate,
        endDate: this.options.endDate,
      };
      return scaleObj;
    },

    /**
     * Function to select an area on the Gantt chart by dragging the mouse.
     * @param {HTMLElement} timeLine - The timeline element.
     */
    selectAreaOnDrag: function (timeLine) {
      let startX,
        taskBarArea,
        hasMoved = false,
        taskArea,
        taskStartDate,
        taskEndDate,
        that = this,
        taskParent,
        end_date,
        timeLineContainer,
        autoScroll = false,
        scrollSpeed = 5;

      timeLine.removeEventListener("mousedown", handleMouseDown);
      timeLine.addEventListener("mousedown", handleMouseDown);

      function handleMouseDown(e) {
        if (
          that.options.mouseScroll &&
          that.options.ctrlKeyRequiredForMouseScroll &&
          e.ctrlKey
        )
          return;
        taskBarArea = document.querySelector("#zt-gantt-bars-area");
        timeLineContainer = document.querySelector("#zt-gantt-right-cell");
        startX =
          e.clientX + timeLineContainer.scrollLeft - that.element.offsetLeft;
        let classesToCheck = ["zt-gantt-task-row", "zt-gantt-task-cell"];

        let isClassPresent = false;
        for (let i = 0; i < classesToCheck.length; i++) {
          if (e.target.classList.contains(classesToCheck[i])) {
            isClassPresent = true;
            break;
          }
        }
        if (isClassPresent === false) {
          return;
        }

        let taskAreaRow;
        if (e.target.classList.contains("zt-gantt-task-row")) {
          taskAreaRow = e.target;
        } else {
          taskAreaRow = e.target.parentElement;
        }

        taskArea = document.createElement("div");
        taskArea.id = "task-area";
        taskArea.classList.add("task-area");
        taskArea.style.top = `${taskAreaRow.offsetTop}px`;
        taskArea.style.left = `${
          e.clientX - timeLine.offsetLeft + timeLineContainer.scrollLeft
        }px`;
        taskArea.style.height = `${taskAreaRow.offsetHeight}px`;

        let allTaskBars = taskBarArea.querySelectorAll(".zt-gantt-bar-task");
        taskParent = allTaskBars[
          Math.floor(taskAreaRow.offsetTop / taskAreaRow.offsetHeight)
        ].getAttribute("zt-gantt-taskbar-id");
        let parentTask = that.getTask(taskParent);
        if (parentTask.hasOwnProperty("end_date")) {
          end_date = parentTask.start_date;
        }
        if (parentTask.children && parentTask.children.length) {
          end_date = that.getStartAndEndDate(parentTask.children).endDate;
        }

        document.addEventListener("mousemove", createTaskArea, false);
        document.addEventListener("mouseup", handleMouseUp, false);
      }

      function handleMouseUp(e) {
        document.removeEventListener("mousemove", createTaskArea, false);
        document.removeEventListener("mouseup", handleMouseUp, false);
        if (startX === e.clientX) {
          hasMoved = false;
          return;
        }
        if (hasMoved === true) {
          taskStartDate =
            that.dates[
              Math.floor(
                (taskArea.offsetLeft < 0 ? 0 : taskArea.offsetLeft) /
                  that.calculateGridWidth(end_date, "day")
              )
            ];

          let isAtLastCol =
            that.calculateTimeLineWidth("current") <
            taskArea.offsetLeft + taskArea.offsetWidth;
          let dateIndex;
          if (!isAtLastCol) {
            dateIndex = Math.floor(
              (taskArea.offsetLeft + taskArea.offsetWidth) /
                that.calculateGridWidth(end_date, "day")
            );
          } else {
            dateIndex = that.dates.length - 1;
          }
          taskEndDate = that.dates[dateIndex];

          if (taskArea) {
            taskArea.remove();
          }
          let task = {
            startDate: new Date(taskStartDate),
            endDate: new Date(taskEndDate),
            parent: isNaN(taskParent) ? taskParent : +taskParent,
          };
          // handle custom event
          that.dispatchEvent("selectAreaOnDrag", { task });
        }
        hasMoved = false;
      }
      function createTaskArea(e) {
        hasMoved = true;

        if (
          e.clientX + timeLineContainer.scrollLeft - that.element.offsetLeft <
          startX
        ) {
          taskArea.style.left = `${
            e.clientX -
            timeLine.offsetLeft +
            timeLineContainer.scrollLeft -
            that.element.offsetLeft
          }px`;
          taskArea.style.width = `${
            startX -
            (e.clientX - that.element.offsetLeft) -
            timeLineContainer.scrollLeft
          }px`;
        } else {
          taskArea.style.left = `${startX - timeLine.offsetLeft}px`;
          taskArea.style.width = `${
            e.clientX -
            startX +
            timeLineContainer.scrollLeft -
            that.element.offsetLeft
          }px`;
        }
        let isTaskAreaExist = document.querySelector("#task-area");
        if (!isTaskAreaExist) {
          if (startX !== e.clientX) {
            taskBarArea.append(taskArea);
          }
        }

        function startAutoScroll(type) {
          if (type === "right") {
            timeLineContainer.scrollLeft += scrollSpeed;
            if (
              timeLineContainer.scrollLeft >=
              timeLineContainer.scrollWidth - timeLineContainer.clientWidth
            ) {
              autoScroll = false;
              return;
            }
          } else if (type === "left") {
            timeLineContainer.scrollLeft -= scrollSpeed;
            if (timeLineContainer.scrollLeft <= 0) {
              autoScroll = false;
              return;
            }
          }
          if (autoScroll) {
            setTimeout(() => {
              startAutoScroll(type);
            }, 50); // Adjust the scroll delay by changing the value here
          }
        }

        const scrollContainer =
          that.element.offsetLeft + timeLineContainer.offsetLeft;
        const scrollThresholdRight =
          scrollContainer + timeLineContainer.offsetWidth - 30;
        const scrollThresholdLeft = scrollContainer + 30;

        // auto scroll the div left and right
        if (e.clientX > scrollThresholdRight - window.scrollX) {
          autoScroll = true;
          startAutoScroll("right");
        } else if (e.clientX < scrollThresholdLeft - window.scrollX) {
          autoScroll = true;
          startAutoScroll("left");
        } else {
          autoScroll = false;
        }
      }
    },

    /**
     * Function to handle dragging of the task progress bar.
     * @param {HTMLElement} resizer - The resizer element used to drag the progress.
     * @param {HTMLElement} progress - The progress bar element.
     * @param {HTMLElement} taskBar - The task bar element.
     * @param {Object} task - The task data object.
     */
    dragTaskProgress: function (resizer, progress, taskBar, task) {
      let startX,
        dragging = false,
        that = this,
        autoScroll = false,
        timeLineContainer,
        scrollSpeed = 5,
        startProgressWidth;

      resizer.removeEventListener("mousedown", handleMouseDown);
      resizer.addEventListener("mousedown", handleMouseDown);

      function handleMouseDown(e) {
        startProgressWidth = progress.offsetWidth;
        timeLineContainer = document.querySelector("#zt-gantt-right-cell");
        startX = e.clientX + timeLineContainer.scrollLeft;

        document.addEventListener("mousemove", resize, false);
        document.addEventListener("mouseup", handleMouseUp, false);
      }

      function handleMouseUp(e) {
        document.removeEventListener("mousemove", resize, false);
        document.removeEventListener("mouseup", handleMouseUp, false);
        if (dragging === true) {
          let progressPer = Math.round(
            (progress.offsetWidth / taskBar.offsetWidth) * 100
          );
          progress.style.width = `${progressPer}%`;
          resizer.style.left = `${progressPer}%`;

          task.progress = progressPer;
          that.originalData.findIndex((item) => {
            if (item.id == task.id) {
              item.progress = progressPer;
            }
          });
          // handle custom event
          that.dispatchEvent("onAfterProgressDrag", { task });
        }
        dragging = false;
      }

      function resize(e) {
        that.dispatchEvent("onBeforeProgressDrag", { task });

        // if onBeforeProgressDrag return false then do not drag the Progress
        if (that.eventValue === false) {
          return;
        }

        dragging = true;
        let progressWidth =
          startProgressWidth +
          (e.clientX - startX) +
          timeLineContainer.scrollLeft;

        progressWidth =
          progressWidth > taskBar.offsetWidth
            ? taskBar.offsetWidth
            : progressWidth < 0
            ? 0
            : progressWidth;

        progress.style.width = `${progressWidth}px`;
        resizer.style.left = `${progressWidth}px`;

        // function for auto scroll
        function startAutoScroll(type) {
          if (type === "right") {
            timeLineContainer.scrollLeft += scrollSpeed;
            if (
              timeLineContainer.scrollLeft >=
              timeLineContainer.scrollWidth - timeLineContainer.clientWidth
            ) {
              autoScroll = false;
              return;
            }
          } else if (type === "left") {
            timeLineContainer.scrollLeft -= scrollSpeed;
            if (timeLineContainer.scrollLeft <= 0) {
              autoScroll = false;
              return;
            }
          }
          if (autoScroll) {
            setTimeout(() => {
              startAutoScroll(type);
            }, 50);
          }
        }

        const scrollContainer =
          that.element.offsetLeft + timeLineContainer.offsetLeft;
        const scrollThresholdRight =
          scrollContainer + timeLineContainer.offsetWidth - 30;
        const scrollThresholdLeft = scrollContainer + 30;

        // auto scroll the div left and right
        if (e.clientX > scrollThresholdRight - window.scrollX) {
          autoScroll = true;
          startAutoScroll("right");
        } else if (e.clientX < scrollThresholdLeft - window.scrollX) {
          autoScroll = true;
          startAutoScroll("left");
        } else {
          autoScroll = false;
        }
      }
    },

    /**
     * Updates the body of the Gantt chart.
     */
    updateBody: function () {
      this.verScroll =
        document.querySelector(".zt-gantt-ver-scroll")?.scrollTop || 0;
      this.horScroll =
        document.querySelector(".zt-gantt-hor-scroll")?.scrollLeft || 0;

      let calendar = document.getElementById("zt-gantt-right-cell");
      let mainContainer = document.querySelector(".zt-gantt-layout");
      calendar.innerHTML = "";
      this.createHeaderScale(this.dates, calendar, this.options);
      this.createBody(
        this.options,
        this.dates,
        calendar,
        mainContainer,
        this.options.dateFormat.day_short
      );
    },

    /**
     * Automatically schedules tasks based on their dependencies.
     */
    autoScheduling: function () {
      const { links } = this.options;
      const linksLength = links?.length;
      for (let i = 0; i < linksLength; i++) {
        const link = this.options.links[i];

        if (!link) return;

        let source = document.querySelector(
          `[zt-gantt-taskbar-id="${link.source}"]`
        );

        let target = document.querySelector(
          `[zt-gantt-taskbar-id="${link.target}"]`
        );

        if (!source || !target) continue;

        let sourceLeft = source.offsetLeft,
          sourceWidth = source.offsetWidth,
          targetLeft = target.offsetLeft,
          targetWidth = target.offsetWidth;

        switch (link.type) {
          case 1:
            if (targetLeft < sourceLeft) {
              target.style.left = sourceLeft + "px";
            }
            break;
          case 2:
            if (targetLeft + targetWidth < sourceLeft + sourceWidth) {
              target.style.left =
                targetLeft +
                (sourceLeft + sourceWidth - (targetLeft + targetWidth)) +
                "px";
            }
            break;
          case 3:
            if (targetLeft + targetWidth < sourceLeft) {
              target.style.left = sourceLeft - targetWidth + "px";
            }
            break;
          case 0:
            if (targetLeft < sourceLeft + sourceWidth) {
              target.style.left = sourceLeft + sourceWidth + "px";
            }
            break;
        }

        let task = this.getTask(link.target);
        let taskStartDate = this.calculateTaskStartDate(target, task);
        let taskEndDate = this.calculateTaskEndDate(target, task);

        this.updateTask(task, taskStartDate, taskEndDate, target);

        this.dispatchEvent("onAutoScheduling", { task });
      }
    },

    // calculateTaskStartDate by element
    calculateTaskStartDate: function (target, task) {
      let taskStartDate =
        this.dates[
          Math.round(
            target.offsetLeft / this.calculateGridWidth(task.start_date, "day")
          ) - (task.type === "milestone" ? 1 : 0)
        ];

      // if taskStartDate is less than the gantt range
      if (!taskStartDate) {
        let dateDiff = Math.round(
          target.offsetLeft / this.calculateGridWidth(task.start_date, "day")
        );
        taskStartDate = this.add(new Date(this.dates[0]), dateDiff, "day");
      }
      return taskStartDate;
    },

    // calculateTaskEndDate by element
    calculateTaskEndDate: function (target, task) {
      let taskEndDate =
        this.dates[
          Math.round(
            (target.offsetLeft + target.offsetWidth) /
              this.calculateGridWidth(task.start_date, "day")
          ) - 1
        ];

      // if taskEndDate is greater than the gantt range
      if (!taskEndDate) {
        let dateDiff =
          Math.round(
            (target.offsetLeft + target.offsetWidth) /
              this.calculateGridWidth(task.start_date, "day")
          ) - this.dates.length;
        taskEndDate = this.add(
          new Date(this.dates[this.dates.length - 1]),
          dateDiff,
          "day"
        );
      }
      return taskEndDate;
    },

    /**
     * Checks if there is a cycle in the task dependencies, starting from the given source and target tasks.
     *
     * @param {string | number} currentSource - The ID of the current source task.
     * @param {string | number} currentTarget - The ID of the current target task.
     * @param {string | number} [linkId=""] - The ID of the link being checked (optional).
     * @returns {boolean} - Returns true if a cycle is detected, false otherwise.
     */
    hasCycle: function (currentSource, currentTarget, linkId = "") {
      if (!currentTarget) return false;

      if (currentSource == currentTarget) return true;

      let currentTargetTask = this.getTask(currentTarget);

      if (currentTargetTask?.parent == currentSource) return true;

      let currentSourceTask = this.getTask(currentSource);

      if (
        (currentSourceTask?.children?.length && findTask(currentSourceTask)) ||
        (currentTargetTask?.children?.length && findTask(currentTargetTask))
      ) {
        return true;
      }

      // check is child or parent
      function findTask(parentTask) {
        for (const task of parentTask?.children) {
          if (task?.id == currentTarget || task?.id == currentSource) {
            return true;
          } else if (task?.children?.length) {
            return findTask(task, type);
          }
        }
        return false;
      }

      const filteredLinks = this.options.links.filter(
        (link) => link.target == currentSource && link.id != linkId
      );
      if (!filteredLinks?.length) return false;

      for (let link of filteredLinks) {
        if (
          link.source === currentTarget ||
          this.hasCycle(link?.source, currentTarget, link?.id)
        ) {
          return true;
        } else {
          return false;
        }
      }
      return false;
    },

    throwError: function (error) {
      throw new Error(error);
    },

    /**
     * Displays a toast notification with a specified title, message, and type.
     * The toast can be dismissed by clicking on it or automatically after a delay.
     *
     * @param {string|null} title - The title of the toast notification (optional).
     * @param {string} message - The message of the toast notification.
     * @param {string} type - The type of the toast notification, used for styling.
     */
    toastr: function (title = null, message, type) {
      let toastrArea = document.querySelector(".zt-gantt-toastr-area");
      if (!toastrArea) {
        toastrArea = document.createElement("div");
        toastrArea.classList.add("zt-gantt-toastr-area");
        document.body.append(toastrArea);
      }

      const newToastr = document.createElement("div");
      newToastr.classList.add("zt-gantt-toastr", `zt-gantt-toastr-${type}`);
      const titleDiv = document.createElement("p");
      const messageDiv = document.createElement("p");
      messageDiv.innerHTML = message;
      if (title) {
        titleDiv.innerHTML = title;
        newToastr.append(titleDiv);
      }

      newToastr.append(messageDiv);
      newToastr.classList.add("zt-gantt-toastr-show");

      toastrArea.append(newToastr);

      const removeToastr = () => {
        newToastr.classList.remove("zt-gantt-toastr-show");
        newToastr.classList.add("zt-gantt-toastr-hide");
        setTimeout(() => {
          newToastr.remove();
        }, 500);
      };

      let removeTimer = setTimeout(removeToastr, 3000);

      newToastr.addEventListener("click", () => {
        clearTimeout(removeTimer);
        removeToastr();
      });

      newToastr.addEventListener("mouseenter", () => {
        clearTimeout(removeTimer); // Clear the timeout when mouse enters
      });

      newToastr.addEventListener("mouseleave", () => {
        removeTimer = setTimeout(removeToastr, 3000); // Start the timeout again when mouse leaves
      });
    },

    getDateTimeComponents: function (dateTimeString) {
      if (!dateTimeString) {
        return;
      }

      const format = this.options.date_format;
      const regex = /%([dmyhis])|(\b\w+\b)/gi;
      const dateTimeParts = dateTimeString.split(/[^\w]+|T/);

      let matchedParts = format.match(regex);
      matchedParts = matchedParts.join(",").replaceAll("%", "").split(",");

      const components = {
        day: 1,
        month: 0,
        year: new Date().getFullYear(),
        hour: 0,
        minute: 0,
        second: 0,
        date: null,
      };

      for (let i in matchedParts) {
        const part = matchedParts[i];
        const value = parseInt(dateTimeParts[i]);
        switch (part) {
          case "d":
            components.day = value;
            break;
          case "m":
            components.month = +value - 1;
            break;
          case "j":
            components.day = value;
            break;
          case "n":
            components.month = +value - 1;
            break;
          case "y":
            components.year = parseYear(value);
            break;
          case "Y":
            components.year = value;
            break;
          case "M":
            components.month = getIndexByValue(
              this.options.dateFormat.month_short,
              value
            );
            break;
          case "F":
            components.month = getIndexByValue(
              this.options.dateFormat.month_full,
              value
            );
            break;
          case "h":
            components.hour = value;
            this.hasHours = value ? true : false;
            break;
          case "g":
            components.hour = value;
            this.hasHours = value ? true : false;
            break;
          case "G":
            components.hour = value;
            this.hasHours = value ? true : false;
            break;
          case "H":
            components.hour = value;
            this.hasHours = value ? true : false;
            break;
          case "i":
            components.minute = value;
            break;
          case "s":
            components.second = value;
            break;
          default:
            components.extra = value;
            break;
        }
      }

      components.date = new Date(
        components.year,
        components.month,
        components.day,
        components.hour,
        components.minute,
        components.second
      );
      return components.date;

      function getIndexByValue(arr, value) {
        return arr.findIndex((item) => item === value);
      }

      function parseYear(year) {
        const currentYear = new Date().getFullYear();
        const currentCentury = Math.floor(currentYear / 100) * 100;
        const currentDecade = currentYear % 100;

        if (year <= currentDecade) {
          return currentCentury + year;
        } else {
          return currentCentury - 100 + year;
        }
      }
    },

    /**
     * Adds event listeners to a color input to change the color of a taskbar,
     * task progress, and taskbar content. Dispatches a custom event when the color changes.
     *
     * @param {HTMLElement} taskbar - The taskbar element to change the color of.
     * @param {HTMLInputElement} colorInput - The color input element.
     * @param {HTMLElement} taskProgress - The task progress element to change the color of.
     * @param {HTMLElement} taskbarContent - The taskbar content element to change the color of.
     * @param {Object} task - The task object associated with the taskbar.
     */
    changeTaskbarColor: function (
      taskbar,
      colorInput,
      taskProgress,
      taskbarContent,
      task
    ) {
      let that = this;
      colorInput.addEventListener("change", (e) => {
        if (task.type === "milestone") {
          taskbarContent.style.setProperty(
            "background-color",
            e.target.value,
            "important"
          );

          taskbarContent.style.setProperty(
            "border-color",
            e.target.value,
            "important"
          );
        } else {
          taskbar.style.setProperty(
            "background-color",
            that.changeOpacity(e.target.value, that.options.taskOpacity),
            "important"
          );

          taskbar.style.setProperty(
            "border-color",
            e.target.value,
            "important"
          );
        }
        if (taskProgress) {
          taskProgress.style.setProperty(
            "background-color",
            e.target.value,
            "important"
          );
        }

        setColorToOriginalData(e.target.value);

        // handle custom event
        that.dispatchEvent("onColorChange", {
          taskColor: e.target.value,
          task,
        });
      });

      colorInput.addEventListener("input", function (e) {
        if (task.type === "milestone") {
          taskbarContent.style.setProperty(
            "background-color",
            e.target.value,
            "important"
          );

          taskbarContent.style.setProperty(
            "border-color",
            e.target.value,
            "important"
          );
        } else {
          taskbar.style.setProperty(
            "background-color",
            that.changeOpacity(e.target.value, that.options.taskOpacity),
            "important"
          );

          taskbar.style.setProperty(
            "border-color",
            e.target.value,
            "important"
          );
        }

        if (taskProgress) {
          taskProgress.style.setProperty(
            "background-color",
            e.target.value,
            "important"
          );
        }
      });

      function setColorToOriginalData(color) {
        task.taskColor = color;
        that.originalData.findIndex((item) => {
          if (item.id == task.id) {
            item.taskColor = color;
          }
        });
      }
    },

    changeOpacity: function (color, opacity) {
      let tempElement = document.createElement("div");
      tempElement.style.color = color;
      document.body.appendChild(tempElement);
      let computedColor = window.getComputedStyle(tempElement).color;
      document.body.removeChild(tempElement);

      let rgbaColor = computedColor
        .replace("rgb", "rgba")
        .replace(")", "," + opacity + ")");
      return rgbaColor;
    },

    // Function to convert RGBA to HEX
    rgbaToHex: function (rgbaColor) {
      if (rgbaColor) {
        const rgbaArray = rgbaColor.match(/\d+/g);
        const hexValue =
          "#" +
          ("0" + parseInt(rgbaArray[0], 10).toString(16)).slice(-2) +
          ("0" + parseInt(rgbaArray[1], 10).toString(16)).slice(-2) +
          ("0" + parseInt(rgbaArray[2], 10).toString(16)).slice(-2);
        return hexValue;
      }
      return false;
    },

    setLocalLang: function (language) {
      this.options.localLang = language;
      this.options.currentLanguage = this.options.i18n[language];
      this.updateBody();
    },

    /**
     * Destroys the Gantt chart by removing its layout, tooltip, and event listeners,
     * and resetting the main element.
     */
    destroy: function () {
      const layout = document.querySelector("#zt-gantt-layout");

      if (layout) {
        layout.remove();
      }

      if (this.tooltip) this.tooltip.remove();

      if (this.lightbox) {
        this.lightbox.lightbox.remove();
        this.lightbox.lightboxBackdrop.remove();
        this.lightbox = null;
      }

      document.removeEventListener(
        "webkitfullscreenchange",
        this.handleFullScreenChangeSafari
      );
      document.removeEventListener(
        "fullscreenchange",
        this.handleFullScreenChange
      );
      window.removeEventListener("resize", this.handleResizeWindow);
      let newElement = this.element.cloneNode(true);
      this.element.replaceWith(newElement);
      this.element = newElement;
    },

    /**
     * Checks if the source and target elements exist and are not hidden.
     *
     * @param {HTMLElement | null} source - The source element to check.
     * @param {HTMLElement | null} target - The target element to check.
     * @returns {boolean} - Returns true if both elements exist and are not hidden, false otherwise.
     */
    isTaskExistOrHidden: function (source, target) {
      let sourceStyle = source ? window.getComputedStyle(source) : null;
      let targetStyle = target ? window.getComputedStyle(target) : null;

      let isSourceHidden = sourceStyle ? sourceStyle.display === "none" : false;
      let isTargetHidden = targetStyle ? targetStyle.display === "none" : false;

      if (
        source == undefined ||
        source == null ||
        target == undefined ||
        target == null ||
        source == target ||
        isTargetHidden ||
        isSourceHidden
      ) {
        return false;
      } else {
        return true;
      }
    },

    createSplitTask: function (barContainer = null, isFromRender = false) {
      let rowCount = 0;

      let ztGanttBarsArea = document.createElement("div");
      ztGanttBarsArea.classList.add("zt-gantt-bars-area");
      ztGanttBarsArea.id = "zt-gantt-bars-area";

      let tasksData = [];

      function getUniqueObjects(data) {
        let tasksArray = [];
        for (let i = 0; i < data.length; i++) {
          const task = data[i];

          if (tasksArray.length == 0) {
            tasksArray.push(task);
          } else {
            let flag = false;
            for (let j = 0; j < tasksArray.length; j++) {
              if (
                new Date(tasksArray[j].start_date).getTime() ===
                  new Date(task.start_date).getTime() &&
                new Date(tasksArray[j].end_date).getTime() ===
                  new Date(task.end_date).getTime()
              ) {
                flag = true;
                tasksArray[j] = task;
                break;
              }
            }
            if (!flag) {
              tasksArray.push(task);
            }
          }
          if (data[i].children) {
            getUniqueObjects(data[i].children);
          }
        }
        return tasksArray;
      }

      for (let i = 0; i < this.options.data.length; i++) {
        if (this.options.data[i].children) {
          let tasks = getUniqueObjects(this.options.data[i].children);
          tasksData.push(tasks);
        }
      }

      for (let j = 0; j < tasksData.length; j++) {
        for (let k = 0; k < tasksData[j].length; k++) {
          const task = tasksData[j][k];

          let isTaskExist = this.getTask(task.id, this.searchedData);
          if (!this.searchedData || isTaskExist) {
            rowCount = j;
          }

          let start_date = task.start_date;
          let end_date = task.end_date || task.start_date;

          if (task.children && task.children.length > 0) {
            let data = [...task.children];
            let startAndEndDate = this.getStartAndEndDate(data);
            let start = startAndEndDate.startDate;
            let end = startAndEndDate.endDate;

            const setDate = (date) => {
              const d = new Date(date);
              d.setHours(0, 0, 0, 0);
              return d;
            };

            const dates = [
              setDate(start_date || start),
              setDate(start),
              setDate(end_date || end),
              setDate(end),
            ];

            start_date = new Date(Math.min(...dates));
            end_date = new Date(Math.max(...dates));
          }

          let cellStartDate = this.options.startDate;
          let isCellGreater = true;
          let cellBefore = this.getDates(cellStartDate, start_date);

          if (cellBefore.length === 0) {
            cellBefore = this.getDates(start_date, cellStartDate);
            isCellGreater = false;
          }

          if (!this.options.fullWeek) {
            cellBefore = this.filterWeekends(cellBefore);
          }

          if (isCellGreater) {
            cellBefore = cellBefore.length - 1;
          } else {
            cellBefore = -(cellBefore.length - 1);
          }
          let ztGanttBarTask = document.createElement("div");

          if (task.taskColor && task.type !== "milestone") {
            ztGanttBarTask.style.setProperty(
              "background-color",
              this.changeOpacity(task.taskColor, this.options.taskOpacity),
              "important"
            );
            ztGanttBarTask.style.setProperty(
              "border-color",
              task.taskColor,
              "important"
            );
          }

          if (task.type === "milestone") {
            ztGanttBarTask.classList.add(
              "zt-gantt-bar-task",
              "zt-gantt-bar-milestone",
              this.options.selectedTask === `${task.id}`
                ? "zt-gantt-selected-task-bar"
                : "zt-gantt-bar-milestone"
            );
          } else {
            ztGanttBarTask.classList.add(
              "zt-gantt-bar-task",
              "zt-gantt-bar-parent-task",
              this.options.selectedTask === `${task.id}`
                ? "zt-gantt-selected-task-bar"
                : "zt-gantt-bar-task"
            );
          }

          //add custom class from user
          this.addClassesFromFunction(
            this.templates.task_class,
            ztGanttBarTask,
            task.start_date,
            task.end_date,
            task
          );

          ztGanttBarTask.setAttribute("task-parent", j);
          ztGanttBarTask.setAttribute("data-task-pos", 0);
          ztGanttBarTask.setAttribute("zt-gantt-taskbar-id", task.id);

          let taskLeft =
            cellBefore * this.calculateGridWidth(start_date, "day");

          let hourLeft = this.getPxByTime(start_date, "left");
          taskLeft += hourLeft;

          ztGanttBarTask.style.left = taskLeft + "px";

          ztGanttBarTask.style.top =
            rowCount * this.options.row_height +
            Math.floor((this.options.row_height * 10) / 100) +
            "px";
          let barTaskHeight = Math.floor((this.options.row_height * 80) / 100);
          ztGanttBarTask.style.height = `${barTaskHeight}px`;
          ztGanttBarTask.style.lineHeight = `${barTaskHeight}px`;
          if (task.type === "milestone") {
            ztGanttBarTask.style.width = `${barTaskHeight}px`;
            ztGanttBarTask.style.left =
              (cellBefore + 1) * this.calculateGridWidth(start_date, "day") +
              "px";
          }

          let ztGanttBarTaskContent = document.createElement("div");
          ztGanttBarTaskContent.classList.add(
            "zt-gantt-bar-task-content",
            "parent-task-bar-content"
          );

          if (task.type === "milestone" && task.taskColor) {
            ztGanttBarTaskContent.style.setProperty(
              "background-color",
              task.taskColor,
              "important"
            );

            ztGanttBarTaskContent.style.setProperty(
              "border-color",
              task.taskColor,
              "important"
            );
          }

          let that = this;

          // handle double click event
          ztGanttBarTask.addEventListener("dblclick", handleDblClick);

          function handleDblClick(e) {
            // custom event handler
            that.dispatchEvent("onBeforeTaskDblClick", { task });

            // if onBeforeTaskDblClick return false then do not drag the task
            if (that.eventValue === false) {
              that.eventValue = true;
              return;
            }

            that.dispatchEvent("onTaskDblClick", { task });

            that.showLightBox(task);
          }

          const userAgent = navigator.userAgent;

          // Handle mouseover event
          ztGanttBarTask.addEventListener("mouseover", handleMouseOver);
          function handleMouseOver(e) {
            if (/^((?!chrome|android).)*safari/i.test(userAgent)) {
              ztGanttBarTask.classList.add("hovered");
            }

            that.updateTooltipBody(task);
          }

          // Handle mouseleave event
          ztGanttBarTask.addEventListener("mouseleave", handleMouseLeave);

          function handleMouseLeave(event) {
            if (/^((?!chrome|android).)*safari/i.test(userAgent)) {
              ztGanttBarTask.classList.remove("hovered");
            }

            that.hideTooltip();
          }

          if (
            this.templates.task_drag("resize", task) &&
            task.type !== "milestone"
          ) {
            // left side resizer
            let ztGanttTaskDragLeft = document.createElement("div");
            ztGanttTaskDragLeft.classList.add("zt-gantt-task-drag-left");

            // right side resizer
            let ztGanttTaskDragRight = document.createElement("div");
            ztGanttTaskDragRight.classList.add("zt-gantt-task-drag-right");

            ztGanttBarTask.append(ztGanttTaskDragLeft, ztGanttTaskDragRight);
            this.resizeTaskBars(
              ztGanttTaskDragLeft,
              ztGanttBarTask,
              "left",
              task
            );
            this.resizeTaskBars(
              ztGanttTaskDragRight,
              ztGanttBarTask,
              "right",
              task
            );
          }

          let taskDates = this.getDates(start_date, end_date);

          if (!this.options.fullWeek) {
            taskDates = this.filterWeekends(taskDates);
          }

          let taskProgress;
          if (this.options.taskProgress === true && task.type !== "milestone") {
            let progressPer = task.progress || 0;
            let taskProgressContainer = document.createElement("div");
            taskProgressContainer.classList.add(
              "zt-gantt-task-progress-wrapper"
            );
            taskProgress = document.createElement("div");
            taskProgress.classList.add("zt-gantt-task-progress");
            taskProgress.style.width = `${
              progressPer > 100 ? 100 : progressPer
            }%`;

            if (task.taskColor) {
              taskProgress.style.setProperty(
                "background-color",
                task.taskColor,
                "important"
              );
            }

            taskProgressContainer.append(taskProgress);

            let taskProgressDrag = document.createElement("div");
            taskProgressDrag.classList.add("zt-gantt-task-progress-drag");
            taskProgressDrag.style.left = `${
              progressPer > 100 ? 100 : progressPer
            }%`;

            // update the task progress onAfterTaskUpdate
            this.attachEvent("onAfterTaskUpdate", () => {
              let progress = progressPer > 100 ? 100 : task.progress || 0;
              taskProgress.style.width = `${progress}%`;

              taskProgressDrag.style.left = `${progress}%`;
            });

            ztGanttBarTask.append(taskProgressContainer, taskProgressDrag);
            this.dragTaskProgress(
              taskProgressDrag,
              taskProgress,
              ztGanttBarTask,
              task
            );
          }

          if (this.templates.task_drag("move", task)) {
            this.resizeTaskBars(
              ztGanttBarTaskContent,
              ztGanttBarTask,
              "move",
              task
            );
          }

          // link control pointers
          let isAddLinks = this.isFunction(this.options.addLinks)
            ? this.options.addLinks(task)
            : this.options.addLinks;

          if (isAddLinks === true) {
            // left point
            let leftLinkPoint = document.createElement("div");
            leftLinkPoint.classList.add(
              "zt-gantt-link-control",
              "zt-gantt-left-point"
            );
            let leftPoint = document.createElement("div");
            leftPoint.classList.add("zt-gantt-link-point");

            // right point
            let rightLinkPoint = document.createElement("div");
            rightLinkPoint.classList.add(
              "zt-gantt-link-control",
              "zt-gantt-right-point"
            );
            let rightPoint = document.createElement("div");
            rightPoint.classList.add("zt-gantt-link-point");

            leftLinkPoint.append(leftPoint);
            rightLinkPoint.append(rightPoint);
            ztGanttBarTask.append(leftLinkPoint, rightLinkPoint);

            this.createNewLink(rightPoint, ztGanttBarTask, task.id, "right");
            this.createNewLink(leftPoint, ztGanttBarTask, task.id, "left");
          }

          //add custom task color picker
          let isCustomColor = this.isFunction(this.options.taskColor)
            ? this.options.taskColor(task)
            : this.options.taskColor;

          if (isCustomColor) {
            let colorPicker = document.createElement("div");
            colorPicker.classList.add("zt-gantt-task-color-picker");
            let colorInput = document.createElement("input");
            colorInput.type = "color";

            setTimeout(() => {
              const backgroundElement =
                task.type === "milestone"
                  ? ztGanttBarTaskContent
                  : ztGanttBarTask;
              // Get the computed style of the element
              const ztGanttBarTaskStyle =
                window.getComputedStyle(backgroundElement);
              // Get the background-color property value
              const backgroundColor =
                ztGanttBarTaskStyle.getPropertyValue("background-color");
              colorInput.value =
                task.taskColor || this.rgbaToHex(backgroundColor);
            }, 0);

            colorPicker.append(colorInput);
            ztGanttBarTask.append(colorPicker);
            this.changeTaskbarColor(
              ztGanttBarTask,
              colorInput,
              taskProgress,
              ztGanttBarTaskContent,
              task
            );
          }

          if (task.type !== "milestone") {
            let taskWidth =
              taskDates.length * this.calculateGridWidth(end_date, "day");

            if (taskWidth === 0 || !taskWidth) {
              ztGanttBarTask.classList.add("zt-gantt-d-none");
            }

            let hourWidth = this.getPxByTime(end_date, "width");
            let hourLeft = this.getPxByTime(start_date, "left");
            hourWidth += hourLeft;
            taskWidth -= hourWidth;

            ztGanttBarTask.style.width = taskWidth + "px";
          }

          if (task.type === "milestone") {
            sideContent = document.createElement("div");
            sideContent.classList.add("zt-gantt-side-content");
            sideContent.innerHTML = this.templates.taskbar_text(
              new Date(task.start_date),
              new Date(task.end_date),
              task
            );
            ztGanttBarTask.append(sideContent);
          } else {
            ztGanttBarTaskContent.innerHTML = this.templates.taskbar_text(
              new Date(task.start_date.setHours(0)),
              new Date(task.end_date.setHours(0)),
              task
            );
          }
          ztGanttBarTask.append(ztGanttBarTaskContent);

          this.attachEvent("onAfterTaskUpdate", (event) => {
            if (task.type === "milestone") {
              sideContent.innerHTML = this.templates.taskbar_text(
                task.start_date.setHours(0),
                task.end_date.setHours(0),
                task
              );
            } else {
              ztGanttBarTaskContent.innerHTML = this.templates.taskbar_text(
                task.start_date.setHours(0),
                task.end_date.setHours(0),
                task
              );
            }
          });

          if (!this.searchedData || isTaskExist) {
            ztGanttBarsArea.append(ztGanttBarTask);
          }
        }

        const barsArea = document.getElementById("zt-gantt-bars-area");

        if (barContainer === null) {
          barContainer = document.getElementById("zt-gantt-scale-data");
        }
        // if barsArea exist then remove barsArea
        if (barsArea && !isFromRender) {
          barsArea.replaceWith(ztGanttBarsArea);
        } else {
          barContainer.append(ztGanttBarsArea);
        }
      }
    },

    calculateGanttHeight: function () {
      let totalGanttHeight = this.calculateScaleHeight(
        this.options.scales,
        this.options.scale_height,
        "scroll",
        0
      );

      let that = this;
      this.options.data.forEach((task) => {
        totalGanttHeight += this.options.row_height;
        if (this.options.openedTasks.includes(task.id)) {
          totalGanttHeight += calculateVisibleTasksHeight(task);
        }
      });

      function calculateVisibleTasksHeight(task) {
        let childHight = 0;
        if (that.options.openedTasks.includes(task.id)) {
          childHight += task.children.length * that.options.row_height;
          task.children.forEach((child) => {
            childHight += calculateVisibleTasksHeight(child);
          });
        }
        return childHight;
      }

      return totalGanttHeight;
    },

    /**
     * Determines the earliest start date and the latest end date from task data or its children.
     *
     * @param {Object} taskData - The task object.
     * @returns {Object} - An object containing the earliest start date and the latest end date.
     */
    getLargeAndSmallDate: function (taskData) {
      const { children = [], start_date = null, end_date = null } = taskData;

      let startDate, endDate;
      if (children?.length) {
        const startAndEndDate = this.getStartAndEndDate([...children]);
        ({ startDate, endDate } = startAndEndDate);
      } else {
        startDate = start_date;
        endDate = end_date;
      }

      const setDate = (date) => {
        const d = new Date(date);
        d.setHours(0, 0, 0, 0);
        return d;
      };

      const dates = [startDate, endDate, start_date, end_date];
      const filteredDates = dates.filter((date) => date);
      const sanitizedDates = filteredDates.map(setDate);

      const minDate = new Date(Math.min(...sanitizedDates));
      const maxDate = new Date(Math.max(...sanitizedDates));

      return { start_date: minDate, end_date: maxDate };
    },

    /**
     * Adds mouse scroll functionality to the Gantt chart.
     * function to add mouse scroll in gantt with  ctrl+click or with click only,
     * based on this.options.mouseScroll or this.options.ctrlKeyRequiredForMouseScroll
     *
     * @param {HTMLElement} verticalScroll - The vertical scrollbar element.
     * @param {HTMLElement} horizontalScroll - The horizontal scrollbar element.
     */
    addMouseScroll: function (verticalScroll, horizontalScroll) {
      const timeLine = document.querySelector("#zt-gantt-right-cell");
      timeLine.addEventListener("mousedown", handleMouseDown);
      let startX,
        startY,
        isScrolling = false,
        that = this;

      function handleMouseDown(event) {
        if (
          (that.options.ctrlKeyRequiredForMouseScroll && !event.ctrlKey) ||
          event.target.closest(".zt-gantt-bar-task")
        )
          return;

        document.addEventListener("mouseup", handleMouseUp, false);
        document.addEventListener("mousemove", scrollTimeline, false);

        startX = event.clientX;
        startY = event.clientY;
        isScrolling = true;
      }

      function handleMouseUp(event) {
        isScrolling = false;
        document.removeEventListener("mousemove", scrollTimeline, false);
        document.removeEventListener("mouseup", handleMouseUp, false);
      }

      function scrollTimeline(event) {
        if (!isScrolling) return;

        const xScroll = startX - event.clientX;
        const yScroll = startY - event.clientY;

        verticalScroll.scrollTop += yScroll;
        horizontalScroll.scrollLeft += xScroll;

        startX = event.clientX;
        startY = event.clientY;
      }
    },

    /**
     * Sorts the Gantt chart data based on a specified field and sort order.
     *
     * @param {string} sortBy - The field by which the data should be sorted.
     * @param {boolean} isAsc - Indicates whether the sort order is ascending (true) or descending (false).
     */
    sort: function (sortBy, isAsc) {
      const sortOrderMultiplier = isAsc ? 1 : -1;

      this.originalData.sort((a, b) => {
        let valueA = this.getFieldValue(a, sortBy);
        let valueB = this.getFieldValue(b, sortBy);

        // Handle null values
        if (valueA === null) {
          valueA = ""; // Treat null as an empty string
        }
        if (valueB === null) {
          valueB = ""; // Treat null as an empty string
        }
        valueA = typeof valueA === "string" ? valueA.toLowerCase() : valueA;
        valueB = typeof valueB === "string" ? valueB.toLowerCase() : valueB;
        return (
          (valueA < valueB ? -1 : valueA > valueB ? 1 : 0) * sortOrderMultiplier
        );
      });
      this.render();
    },

    /**
     * Function to safely get the field value from the object,
     * this is a support function for sort method
     */
    getFieldValue: function (object, fieldName) {
      return fieldName
        .split(".")
        .reduce(
          (o, key) => (o && o[key] !== undefined ? o[key] : null),
          object
        );
    },

    /**
     * Adds an inline editor to a cell for editing cell data.
     *
     * @param {Object} cellData - The data associated with the cell.
     * @param {Object} editorData - The configuration data for the editor.
     * @param {HTMLElement} cell - The cell element to which the editor is attached.
     * @param {HTMLElement} sidebarDataContainer - The container element for the editor.
     */
    addInlineEditor: function (
      cellData,
      editorData,
      cell,
      sidebarDataContainer
    ) {
      const editorWraper = document.createElement("div");
      editorWraper.classList.add("zt-gantt-inline-editor-wraper");
      editorWraper.style.cssText = `
        top: ${cell.offsetTop}px;
        left: ${cell.offsetLeft}px;
        height: ${cell.offsetHeight}px;
        width: ${cell.offsetWidth}px;
    `;

      const editor = document.createElement(
        editorData.type === "select" ? "select" : "input"
      );
      editor.type =
        editorData.type === "select" ? editorData.value : editorData.type;
      editor.name = editorData.map_to;

      if (editorData.type === "select") {
        editor.value = cellData[editorData.map_to];
        editorData.options.forEach((option) => {
          const optionElem = document.createElement("option");
          optionElem.innerHTML = option;
          optionElem.value = option;
          editor.appendChild(optionElem);
        });
      } else if (editorData.type === "date") {
        editor.value = this.formatDateToString(
          "%Y-%m-%d",
          cellData[editorData.map_to]
        );
      } else {
        editor.value = cellData[editorData.map_to];
        editor.min = editorData.min;
        editor.max = editorData.max;
      }

      editorWraper.append(editor);

      sidebarDataContainer.append(editorWraper);

      editor.focus();

      editor.addEventListener("blur", () => {
        // handle custom event
        this.dispatchEvent("onBeforeSave", {
          task: cellData,
          columnName: editorData.map_to,
          oldValue: cellData[editorData.map_to],
          newValue: editor.value,
        });

        cellData[editorData.map_to] = editor.value;

        this.updateTaskData(cellData);

        this.removeInlineEditor(editorWraper);
        // handle custom event
        this.dispatchEvent("onSave", {
          task: cellData,
          columnName: editorData.map_to,
          oldValue: cellData[editorData.map_to],
          newValue: editor.value,
        });
      });
    },

    /**
     * Removes an inline editor element from the DOM.
     *
     * @param {HTMLElement} editor - The inline editor element to be removed.
     */
    removeInlineEditor: function (editor) {
      if (editor) {
        editor.remove();
      }
    },

    /**
     * Creates a debounced version of a function, which delays its execution until after
     * a certain wait time has elapsed without further calls.
     *
     * @param {Function} func - The function to debounce.
     * @param {number} wait - The time in milliseconds to wait before executing the debounced function.
     * @returns {Function} - Returns the debounced function.
     */
    debounce: function (func, wait) {
      return function (...args) {
        const context = this;
        clearTimeout(this.debounceTimeout);
        this.debounceTimeout = setTimeout(
          () => func.apply(context, args),
          wait
        );
      };
    },

    /**
     * Checks if a given date is outside the range of the Gantt chart range.
     *
     * @param {Date} date - The date to check.
     * @returns {boolean} - Returns true if the date is outside the Gantt chart range, otherwise false.
     */
    outOfGanttRange: function (date) {
      const targetDate = this.stripTime(date).getTime();
      const startDate = this.stripTime(this.options.startDate).getTime();
      const endDate = this.stripTime(this.options.endDate).getTime();
      return targetDate < startDate && targetDate > endDate;
    },

    /**
     * Creates a tooltip element if it does not already exist.
     * Attaches necessary event listeners for tooltip positioning.
     */
    createTooltip: function () {
      // if tooltip exist then return
      if (this.tooltip) return;

      const tooltip = document.createElement("div");
      tooltip.classList.add("zt-gantt-tooltip");
      tooltip.id = "zt-gantt-tooltip";
      tooltip.style.display = "none";
      document.body.append(tooltip);
      this.tooltip = tooltip;

      this.element.removeEventListener(
        "mousemove",
        this.updateTooltipPosition.bind(this)
      );
      this.element.addEventListener(
        "mousemove",
        this.updateTooltipPosition.bind(this)
      );
    },

    /**
     * Updates the position of the tooltip based on the mouse cursor's coordinates.
     *
     * @param {MouseEvent} e - The mouse event containing cursor coordinates.
     */
    updateTooltipPosition: function (e) {
      const tooltip = this.tooltip;
      const scrollY = window.scrollY;
      const scrollX = window.scrollX;
      const screenWidth = window.innerWidth;
      const bodyHeight = document.documentElement.clientHeight;

      // Calculate new positions
      let top = e.clientY + 25;
      let left = e.clientX + 10;

      // Adjust left position if tooltip goes beyond screen width
      if (left + tooltip.offsetWidth > screenWidth - 15) {
        left = e.clientX - tooltip.offsetWidth;
        if (left < 0) left = 0;
      }

      // Adjust top position if tooltip goes beyond body height
      if (top + tooltip.offsetHeight > bodyHeight - 5) {
        top = e.clientY - tooltip.offsetHeight;
      }

      // Apply the new positions
      tooltip.style.top = `${top + scrollY}px`;
      tooltip.style.left = `${left + scrollX}px`;
    },

    /**
     * Hides the tooltip by clearing its content and setting its display style to 'none'.
     */
    hideTooltip: function () {
      const tooltip = this.tooltip;

      if (!tooltip) return;

      tooltip.innerHTML = "";
      tooltip.style.display = "none";
    },

    // function to update tooltip innerHTML
    updateTooltipBody: function (task) {
      const tooltip = this.tooltip;

      if (!tooltip) return;

      start_date = task.start_date;
      end_date = task.end_date;

      if (task.children?.length) {
        ({ start_date, end_date } = this.getLargeAndSmallDate(task));
      }

      const tooltipContent = this.templates.tooltip_text(
        start_date,
        end_date,
        task
      );

      if (tooltipContent !== false) {
        tooltip.innerHTML = tooltipContent;
        tooltip.style.display = "block";
      } else {
        this.hideTooltip();
      }
    },

    /**
     * Checks if the given value is a function.
     *
     * @param {*} value - The value to check.
     * @returns {boolean} - Returns true if the value is a function, otherwise false.
     */
    isFunction: function (value) {
      return typeof value === "function";
    },

    /**
     * Trims leading and trailing whitespace from a class string,
     * replaces multiple spaces with a single space, and adds the resulting classes to the element.
     *
     * @param {HTMLElement} element - The element to which classes will be added.
     * @param {string} classString - A string containing one or more class names, possibly separated by whitespace.
     */
    addClass: function (element, classString) {
      if (classString) {
        const classes = classString.trim().replace(/\s+/g, " ").split(" ");
        element.classList.add(...classes);
      }
    },

    /**
     * Checks if the specified property of an object is a function, and if so,
     * calls it with the provided parameters. If the function returns a value,
     * trims whitespace, splits the result by spaces, and adds the resulting classes
     * to the specified element's class list.
     * @param {function} func - The function which return the css classes.
     * @param {HTMLElement} element - The HTML element to which classes will be added.
     * @param {...any} params - Parameters to be passed to the function if it exists.
     */
    addClassesFromFunction: function (func, element, ...params) {
      if (this.isFunction(func)) {
        // Call the function with the provided parameters
        let cssClass = func(...params);
        this.addClass(element, cssClass);
      }
    },

    /**
     * Method to filter out weekends if fullWeek option is not enabled.
     *
     * @param {Array} dates - Array of date objects to be filtered.
     * @returns {Array} Filtered array of date objects without weekends.
     */
    filterWeekends: function (dates) {
      const weekday = this.options.dateFormat.day_short;
      return dates.filter((date) => {
        const dayName = weekday[new Date(date).getDay()];
        return !this.options.weekends.includes(dayName);
      });
    },
  };

  global.ztGantt = ZTGantt;
})(this);
