import Image from 'next/image';

import { Card, CardHeader } from '@mui/material';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

import { PublicKey } from '@/components/publicKey.component';

// import ProTip from '@/components/ProTip';
// import Copyright from '@/components/Copyright';

export default function Home() {
  return (
    <Box
      width="100vw"
      display="flex"
      flexDirection="column"
      >
      <Container
        maxWidth="lg"
        sx={{
          my: 4,
          px: 2,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: 2,
        }}
        >
        <Image src="/icons/icon-192x192.png" alt="logo" width={100} height={100} />
        <Typography variant="h4" component="h1">
          ProteusOS
        </Typography>
        <Typography variant="h5" component="h2">
          Privacy. Security. Yours.
        </Typography>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          gap={2}
          flexGrow={1}
          flexBasis="auto"
          my={2}
          >
          <Card>
            <CardHeader
              title="Environments"
              />
          </Card>

          <Card>
            <CardHeader
              title="Modules"
              />
          </Card>
        </Box>
        <PublicKey />
        {/* <ProTip />
        <Copyright /> */}
      </Container>

    </Box>
  );
}