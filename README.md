# 「事業系ごみ分別検索サイト」について

神戸市では、市内の事業者とその従業員の方々に向け「事業系ごみ分別検索サイト」を公開しています。

[神戸市：事業系ごみ分別検索サイト](http://www.city.kobe.lg.jp/business/regulation/environment/enterprise/bizwastesearch/index.html)

本サイトの公開の目的、公開したことによる効果などは、以下にまとめています。

[自治体のごみ分別検索サイトをつくったぞ、でもってオープンソースも公開したぞ（ただし事業系ごみ） - Qiita](https://qiita.com/S_Kosaka/items/8aeae761695757cdb78f)

## セットアップ方法

公開しているファイルは以下のとおりです。

### 「WebsiteData」フォルダに格納しているファイル

Web サーバーにて公開するファイル群です。

**<おことわり>**  
開発環境や本番環境等の都合により、公開しているサイトはモダンな方法を用いずに開発しています。
扱いづらいかもしれませんが、その点ご容赦ください。

- 公開しているフォルダ・ファイルを、下図のとおり Web サーバーに配置してください。
- ファイル名が「～.sample」となっているものはサンプルファイルです。実際に使用する際は「.sample」を外してください。  
  <br>（code フォルダ内のファイル：Web サーバーに配置）★ 印のフォルダは別途作成してください。  
   root/  
   ┣ css/  
   ┃ ┣ normalize.css ← ブラウザ css リセット用  
   ┃ ┗ style.css ← サイト全般の css  
   ┣ fonts/ ★ ←Bootstrap 公式より DL したファイルのうち、fonts フォルダ内のファイルを格納（Bootstrap については、[使用ライブラリについて](#使用ライブラリについて)を参照）  
   ┣ img/  
   ┃ ┗（gif,png,ico ファイル※ファイル名は省略）  
   ┣ json/  
   ┃ ┣ data.json.sample ← 品目データ  
   ┃ ┗ gyoshubetsu.json.sample ← 業種別ページ用
  ┣ lib/ ★ ← 各種ライブラリファイルを格納（[使用ライブラリについて](#使用ライブラリについて)を参照））  
   ┣ script/  
   ┃ ┣ script.js ← サイト全般の JavaScript  
   ┃ ┗ setting.js.sample ← 設定値（詳細は下記）  
   ┃  
   ┃ ＜以下はファイル＞  
   ┣ bizwaste-rule.csv.sample ← オープンデータ用 csv ファイル
  ┣ gyoshubetsu.html ← 業種別ページ  
   ┣ gyoshubetsu-select.html ← 業種別ページ（業種選択後ページ）  
   ┣ index.html  
   ┣ information.html ← 排出方法詳細  
   ┣ list.html ← 品目一覧（「リストでさがす」で表示）  
   ┣ result.html ← 検索結果  
   ┣ search.html ← 検索ページ（「キーワードでさがす」で表示）  
   ┣ select.html ← 職種選択ページ（検索結果選択後、職種により排出方法が異なる場合に表示）  
   ┗ sitemap.xml.sample ← サイトマップファイル

- サイトにおいて使用する下記の設定値は script/setting.js 内に記述することで使用できます。
  - ls … localStorage（ローカルストレージ）の key。
  - gasurl … GoogleAppScript（GAS）により Google スプレッドシートにアクセスログ等を記録する際に使用する Google スプレッドシートの URL（詳細は[後述](#「GASData」フォルダに格納しているファイル)）。
- サイトマップ（sitemap.xml）を作成する際は、掲載品目のページごとに掲載することをお薦めします。そうすることで、検索エンジンの index に各品目ページが反映される場合があります。詳しい記述方法は下記およびサンプルファイルをご確認下さい。

  [拝啓 Google 様、JavaScript と JSON で動的に変化するページをインデックスしてください - Qiita](https://qiita.com/S_Kosaka/items/ab6465141061e08bce64)

### 「GASData」フォルダに格納しているファイル

運用サイトでは、GoogleAppScript（GAS）により Google スプレッドシートにアクセスログ、検索ログ等を記録しています。
また、月替りに直前 1 ヶ月分のログを別ファイルに保存し、任意のメールアドレスに Excel 形式で送付する機能も用意しています。

詳細は下記にまとめています。

[GAS で擬似的なアクセスログをつくる - Qiita](https://qiita.com/S_Kosaka/items/539394beaaf02a4a0998)

運用サイトと同様の方法でログを残される場合は、以下の方法で必要な準備を行なってください。

1. Google ドライブの任意のディレクトリに GASData フォルダのファイル群を保存（すべてのファイルを同じディレクトリに保存してください）  
   なお、「gas_setting.js.sample」はサンプルファイルです。実際に使用する際は「.sample」を外してください。  
    <br>（gascode フォルダ内に公開しているファイル：Google ドライブに配置）
   - gas_dopost.js … クライアント（閲覧者）から POST されたデータを処理
   - gas_getsujishori.js … 毎月月初に、その前月のログを別ファイルにまとめる等の処理
   - gas_setting.js.sample … 設定値を保存（詳細は 3.のとおり）
2. 過去のログを保存するためのフォルダを作成
3. シート ID 等を setting.js に記述（設定値は下記のとおり）

   - spreadsheetId … アクセスログのスプレッドシートの ID
   - newfolderId … 過去のログの保存先ディレクトリの ID

   ＜以下はログをメール送信する際に使用＞

   - newlog … アクセスログをブラウザで開くための URL
   - kakolog … 過去のログをブラウザで開くための URL
   - gaccount … アクセスログ等を保存する Google アカウント
   - newlog … アクセスログをブラウザで開くための URL
   - kakolog … 過去のログをブラウザで開くための URL
   - gaccount … アクセスログ等を保存する Google アカウント

## 使用ライブラリについて

本サイトで使用しているライブラリは下記のとおりです。

それぞれダウンロードし、「lib」フォルダ（Bootstrap の「fonts」フォルダのファイルは「fonts」フォルダ）に格納してください。  
※カッコ内は動作確認済みのバージョンおよび、各 html に参照先として記述したファイル名

- Animate.css（v3.4.0 | animate.css）  
  <https://daneden.github.io/animate.css/>
- Bootstrap（v3.4.0 | bootstrap.min.css,bootstrap.min.css.map,bootstrap.min.js）  
  <https://getbootsktrap.com/>
- Bootstrap Add Clear（v1.0.7 | bootstrap-add-clear.min.js）  
  <http://gesquive.github.io/bootstrap-add-clear/>
- cb-materialbtn.css（v0.5.5 | cb-materialbtn.min.css）  
  <https://github.com/maechabin/bootstrap-material-button-color>
- Intro.js（v2.9.3 | intro.min.js,intro.min.css）  
  <https://introjs.com/docs/>
- jQuery（v1.9.1 | jquery.min.js）  
  <https://jquery.com/>
- jQeryUI（v1.11.4 | jquery-ui.min.css,jquery-ui-min.js）  
  <https://jqueryui.com/>

## ローカライズについて

公開している内容は、神戸市の事業系一般廃棄物の処分ルールに基づき構築しています。  
本サイトを神戸市以外の内容で公開される場合は、その市町村の排出ルールに基づき修正してください。

[（参考）神戸市一般廃棄物処理実施計画](http://www.city.kobe.lg.jp/information/project/environment/ippaikeikaku/ippai-jisshikeikaku.html)

## ライセンスについて

本サイトのソースコードの著作権は神戸市に帰属します。  
ただし、このソースコードは MIT のもと配布されています。  
MIT に従えば、どなたでも利用、改変、及び再配布が可能です。
