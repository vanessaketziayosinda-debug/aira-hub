<!DOCTYPE html>
<html lang="id">

<head>
    <meta charset="UTF-8">

    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <meta name="csrf-token" content="{{ csrf_token() }}">

    <title>AIRA Messages - AIRA HUB</title>

    @vite([
        'resources/css/app.css',
        'resources/js/chat.jsx'
    ])
</head>

<body class="bg-zinc-950">

    <div id="chat-app"></div>

</body>

</html>
