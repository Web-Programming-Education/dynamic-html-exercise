# Übung: Dynamisches Generieren von HTML

## Setup

Zum Installieren der Abhängigkeiten einmalig `npm install` ausführen.

Die bestehenden HTML-, CSS und Javascript-Dateien in den Ordner `public` kopieren. Die HTML-Datei sollte `index.html` heißen, sodass diese direkt über [http://localhost:3000](http://localhost:3000) aufrufbar wird.

Danach kann das Projekt mit `npm start` gestartet werden. Es wird automatisch neugestartet sobald eine Datei gespeichert wird.

Die Anwendung ist dann auf [http://localhost:3000](http://localhost:3000) verfügbar

## Aufgabe

Ziel der Aufgabe ist es eine HTML-Seite für einen Blog-Artikel zu erstellen.

### Aufgabe 1)

Die Seite soll aus einem Gerüst bestehen, wie es im angehängten Bild dargestellt ist.
Beim vergrößern oder verkleinern des Browserfensters soll lediglich der Main-Content wachsen / schrumpfen
Das Gerüst soll mithilfe von CSS Grid realisiert werden.

Die einzelnen Bereiche sollen visuell voneinander abgegrenzt sein (z.B. durch border/box-shadow/background).
Jeder Bereich soll Text enthalten. Beispieltext findet ihr zum Beispiel hier: https://www.loremipsum.de/

Das Aussehen der Seite wird nicht bewertet.

CSS-Regeln dürfen nicht inline angegeben werden, sondern müssen im <style> Tag oder in einer externen Datei angegeben werden.

### Aufgabe 2)

Die Blogseite soll neben dem Hauptartikel zusätzlich eine Kommentar-Funktion bekommen.
Bestehende Kommentare werden von einer Web API bereitgestellt:

```http
GET localhost:3000/comments
```

Außerdem bietet die API die Möglichkeit neue Kommentare anzulegen:

```http
POST localhost:3000/comments
Content-Type: application/json

{ "title": "Kommentartitel", "content": "Kommentartext mit mehreren Wörtern", "username": "Benutzername" }
```

Die bestehende Blog-Seite aus Aufgabe 1 soll um einen Bereich innerhalb des Main-Content erweitert werden.

Beim Laden der Seite sollen Kommentare von der Web API abgerufen und dynamisch in diesem neuen Bereich der Seite hinzugefügt werden (d.h. per Javascript und nicht manuell in das HTML kopiert). Es sollen alle Kommentare mit Überschrift, Benutzername und Inhalt untereinander angezeigt werden. Für diese Informationen sind, wo immer möglich, semantische HTML-Elemente zu nutzen.

Unterhalb dieser Kommentarliste soll außerdem die Möglichkeit geboten werden, einen neuen Kommentar über entsprechende Textfelder zu verfassen und über die oben genannte API zu speichern. Das Formular soll anhand nachfolgender Bedinungen validiert werden und nur wenn alle Bedingungen erfüllt sind gesendet werden. Der Benutzer soll auf beliebige Art auf Validierungprobleme hingewiesen werden, sodass er diese beheben kann. Bedingungen:

* Die Angabe des Benutzernamens ist verpflichtend. Der Benutzername muss mindestens 4 und nicht länger als 20 Zeichen sein.
* Die Angabe des Titels ist verpflichtend.
* Die Angabe des Inhalts ist verpflichtend und muss mindestens zwei Wörter enthalten.

Nach dem Absenden eines neuen Kommentars, soll dieser auf der Seite ohne zusätzliche Nutzeraktion, wie "neu laden", angezeigt werden.

## Hinweis

Die angelegten Kommentare können zu Testzwecken mit folgender API zurückgesetzt werden:
`POST http://localhost:3000/comments/reset HTTP/1.1`